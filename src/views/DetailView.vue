<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import BackButton from "../components/DetailView/BackButton.vue";
import ColumnsButton from "../components/DetailView/ColumnsButton.vue";
import ColumnsToggleModal from "../components/DetailView/ColumnsToggleModal.vue";
import ConfirmExportModal from "../components/DetailView/ConfirmExportModal.vue";
import ExportButton from "../components/DetailView/ExportButton.vue";
import { type CsvFile } from "../types/csv-file";

const parsedUploadedFiles = ref<CsvFile[]>([]);
const file = ref<CsvFile | null>(null);
const confirmExportModalVisible = ref(false);
const columnsToggleModalVisible = ref(false);
const isLoading = ref(true);
const selectedRows = ref<Record<number, boolean>>({});
const visibleColumns = ref<boolean[]>([]);

const router = useRouter();
const route = useRoute();

const loadUploadedFiles = () => {
  setTimeout(() => {
    const uploadedFiles = localStorage.getItem("uploadedFiles");
    if (uploadedFiles) {
      parsedUploadedFiles.value = JSON.parse(uploadedFiles);
      const csvID = route.params.id as string;
      file.value =
        parsedUploadedFiles.value.find((file) => file.id === csvID) || null;

      if (file.value) {
        visibleColumns.value = Array(file.value.columnCount).fill(true);
      }
    }
    isLoading.value = false;
  }, 1000);
};

onMounted(loadUploadedFiles);

const saveUploadedFiles = () => {
  localStorage.setItem(
    "uploadedFiles",
    JSON.stringify(parsedUploadedFiles.value)
  );
};

watch(parsedUploadedFiles, saveUploadedFiles, { deep: true });

const isAllColumnsHidden = computed(() => {
  return visibleColumns.value.every((e) => e === false);
});

const toggleRowSelection = (index: number) => {
  selectedRows.value[index] = !selectedRows.value[index];
};

const hasSelectedRows = computed(() => {
  console.log(Object.values(selectedRows.value).filter((e) => e));
  return Object.values(selectedRows.value).filter((e) => e).length;
});

const openConfirmExportModal = () => {
  confirmExportModalVisible.value = true;
};

const toggleColumnsToggleModal = () => {
  columnsToggleModalVisible.value = !columnsToggleModalVisible.value;
};

const exportFile = () => {
  if (!file.value) return;

  const header = file.value.data[0];
  const visibleHeader = Object.values(header).filter(
    (_, index) => visibleColumns.value[index]
  );

  const selectedData = file.value.data
    .slice(1)
    .filter((_, index) => selectedRows.value[index]);

  if (selectedData.length > 0) {
    const visibleData = selectedData.map((row) =>
      Object.values(row).filter((_, index) => visibleColumns.value[index])
    );

    const exportedRows = visibleData.length;
    const exportedColumns = visibleHeader.length;

    file.value.exportedRows = exportedRows;
    file.value.exportedColumns = exportedColumns;
    file.value.exported = true;

    const fileIndex = parsedUploadedFiles.value.findIndex(
      (f) => f.id === file.value!.id
    );
    if (fileIndex !== -1) {
      parsedUploadedFiles.value[fileIndex] = file.value;
    }

    const csvContent = [
      visibleHeader.join(","),
      ...visibleData.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `modified-${file.value.name}`;
    link.click();
  }
};

const handleBackButtonClick = () => {
  router.push("/");
};

const toggleColumnVisibility = (index: number) => {
  visibleColumns.value[index] = !visibleColumns.value[index];
};

const showAllColumns = () => {
  visibleColumns.value.fill(true);
  toggleColumnsToggleModal();
};

const hideAllColumns = () => {
  visibleColumns.value.fill(false);
  toggleColumnsToggleModal();
};

const headers = computed(() => {
  return file.value ? Object.values(file.value.data[0]).map(String) : [];
});
</script>

<template>
  <main class="detail">
    <transition name="fade">
      <ConfirmExportModal
        v-model:modelValue="confirmExportModalVisible"
        @confirmExport="exportFile"
      />
    </transition>

    <div class="detail__top">
      <ColumnsButton
        @columnsButtonClick="toggleColumnsToggleModal"
      />
      <transition name="fade">
        <ColumnsToggleModal
          :headers="headers"
          :visibleColumns="visibleColumns"
          @toggleColumn="toggleColumnVisibility"
          @showAllColumns="showAllColumns"
          @hideAllColumns="hideAllColumns"
          v-model:modelValue="columnsToggleModalVisible"
        />
      </transition>

      <div class="detail__top-button-wrapper">
        <ExportButton
          @exportButtonClick="openConfirmExportModal"
          :disabled="!hasSelectedRows"
        />
        <BackButton @backButtonClick="handleBackButtonClick" />
      </div>
    </div>

    <section class="detail__listing">
      <transition mode="out-in" name="fade">
        <template v-if="isLoading">
          <div class="listing__loader">
            <span class="loader"></span>
            fake loading...
          </div>
        </template>
        <template v-else-if="isAllColumnsHidden">
          <div class="detail__empty">
            <img
              src="../assets/img/table-icon.svg"
              width="96"
              height="75"
              alt="Imagem de uma tabela"
              title="Imagem de uma tabela"
            />
            <p>Selecione ao menos uma coluna...</p>
          </div>
        </template>
        <template v-else>
          <div class="detail__table">
            <div class="detail__table-row detail__table-header">
              <div class="detail__table-cell"></div>
              <div
                class="detail__table-cell"
                v-for="(header, index) in file?.data[0]"
                :key="'header-' + index"
                v-show="visibleColumns[parseInt(index)]"
              >
                {{ header }}
              </div>
            </div>
            <div
              class="detail__table-row"
              v-for="(row, rowIndex) in file?.data.slice(1)"
              :key="'row-' + rowIndex"
              :class="{ selected: selectedRows[rowIndex] }"
              @click="toggleRowSelection(rowIndex)"
            >
              <div class="detail__table-cell">
                <input type="checkbox" v-model="selectedRows[rowIndex]" />
              </div>
              <div
                class="detail__table-cell"
                v-for="(item, itemIndex) in row"
                :key="'item-' + itemIndex"
                v-show="visibleColumns[parseInt(itemIndex)]"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </template>
      </transition>
    </section>
  </main>
</template>

<style scoped>
.detail {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow: hidden;
}

.detail__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}

.detail__top .detail__top-button-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
}

.detail__top .detail__top-button-wrapper button:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.detail__table {
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: fit-content;
}

.detail__table-row {
  display: flex;
  border-bottom: 1px solid var(--light-gray-color);
  cursor: pointer;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 74px;
  grid-auto-columns: minmax(200px, min-content);
  gap: 10px;
  transition: all 0.2s;
  font-family: Roboto;
  font-size: 0.8125rem;
}

.detail__table-row:hover {
  background: var(--background);
}

.detail__table-row.selected {
  background-color: #d3e0ff;
}

.detail__table-cell {
  flex: 1;
  padding: 0.9375rem 1rem;
  border-right: 1px solid #ddd;
  display: flex;
  align-items: center;
  word-break: break-all;
}

.detail__table-row .detail__table-cell:nth-child(1) {
  justify-content: center;
}

.detail__table-header {
  font-weight: bold;
  background-color: #f4f4f4;
}

.detail__listing {
  border-radius: 15px;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.15);
  background-color: var(--white-color);
  flex: 1;
  overflow: auto;
  height: 100%;
}

.detail__listing::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

.detail__listing::-webkit-scrollbar-track {
  margin: 10px;
}

.detail__listing::-webkit-scrollbar-thumb {
  border: 2px solid var(--white-color);
  background-clip: padding-box;
  background: var(--medium-gray-color);
  border-radius: 4px;
}

.detail__table-cell input[type="checkbox"] {
  position: relative;
  cursor: pointer;
}

.detail__table-cell input[type="checkbox"]:before {
  content: "";
  display: block;
  position: absolute;
  width: 13px;
  height: 13px;
  top: 0;
  left: 0;
  border: 2px solid #555555;
  border-radius: 3px;
  background-color: white;
}

.detail__table-cell input[type="checkbox"]:checked:after {
  content: "";
  display: block;
  width: 3px;
  height: 8px;
  border: 1px solid var(--dark-blue-color);
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 2px;
  left: 6px;
}

.detail__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100%;
}

.detail__empty p {
  font-weight: 700;
  color: var(--black-color);
  font-size: 1rem;
}

.listing__loader {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 100%;
}

.loader {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid var(--dark-blue-color);
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 0.8s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
