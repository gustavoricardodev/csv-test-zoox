<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import ImportButton from "../components/HomeView/ImportButton.vue";
import UploadModal from "../components/HomeView/UploadModal.vue";
import ListingEmpty from "../components/HomeView/ListingEmpty.vue";
import ListingFullfilled from "../components/HomeView/ListingFullfilled.vue";
import ConfirmDeleteModal from '../components/HomeView/ConfirmDeleteModal.vue'
import { type CsvFile } from "@/types/csv-file";

const parsedUploadedFiles = ref<CsvFile[]>([]);
const uploadModalVisible = ref(false);
const confirmDeleteModalVisible = ref(false);
const fileToDelete = ref<string | null>(null);

const loadUploadedFiles = () => {
  const uploadedFiles = localStorage.getItem("uploadedFiles");
  if (uploadedFiles) {
    parsedUploadedFiles.value = JSON.parse(uploadedFiles);
  }
};

const saveUploadedFiles = () => {
  localStorage.setItem("uploadedFiles", JSON.stringify(parsedUploadedFiles.value));
};

onMounted(loadUploadedFiles);

watch(parsedUploadedFiles, saveUploadedFiles, { deep: true });

const openUploadModal = () => {
  uploadModalVisible.value = true;
};

const openConfirmDeleteModal = (fileId: string) => {
  confirmDeleteModalVisible.value = true;
  fileToDelete.value = fileId;
};

const deleteFile = () => {
  parsedUploadedFiles.value = parsedUploadedFiles.value.filter(
    file => file.id !== fileToDelete.value
  );
  confirmDeleteModalVisible.value = false;
};

const downloadFile = (file: CsvFile) => {
  const csvContent = file.data.map(row => Object.values(row).join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `${file.name}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<template>
  <main class="home">
    <Transition name="fade">
      <UploadModal v-model="uploadModalVisible" />
    </Transition>

    <Transition name="fade">
      <ConfirmDeleteModal
        v-model="confirmDeleteModalVisible"
        @confirmDeleteFile="deleteFile"
      />
    </Transition>

    <div class="home__top">
      <h1 class="home__top-title">Seus Arquivos</h1>
      <ImportButton @importButtonClick="openUploadModal" />
    </div>

    <section class="home__listing">
      <Transition mode="out-in" name="fade">
        <ListingFullfilled
          v-if="parsedUploadedFiles.length"
          :files="parsedUploadedFiles"
          @downloadFile="downloadFile"
          @deleteFile="openConfirmDeleteModal"
        />
        <ListingEmpty v-else />
      </Transition>
    </section>
  </main>
</template>


<style scoped>
.home {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
}

.home__top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home__top-title {
  font-family: Roboto;
  font-size: 1.0625rem;
  font-weight: 300;
  color: var(--black-color);
}

.home__listing {
  border-radius: 15px;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.15);
  background-color: var(--white-color);
  flex: 1;
  overflow: auto;
}

.home__listing::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    padding-bottom: 20px;

}
 
.home__listing::-webkit-scrollbar-track {
    margin: 40px;
    box-shadow: inset 5px 5px 10px var(--white-color);
    border-radius: 16px;

}

.home__listing::-webkit-scrollbar-thumb {
    border-right: 5px solid var(--white-color);
    border-bottom: 5px solid var(--white-color);
    background-clip: padding-box;
    background: var(--medium-gray-color); 
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
