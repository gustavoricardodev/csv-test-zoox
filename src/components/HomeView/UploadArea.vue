<script setup lang="ts">
import { ref, watch } from "vue";
import Papa from "papaparse";
import SelectFileButton from "./SelectFileButton.vue";
import SelectAnotherFileButton from "./SelectAnotherFileButton.vue";

interface CsvFile {
  data: Record<string, unknown>[];
  numberOfRows: number;
  numberOfColumns: number;
  createdAt: string;
  name: string;
}

const myFiles = ref<CsvFile[]>([]);
const progress = ref(0);
const fileInput = ref<HTMLInputElement | null>(null);
const isConverting = ref(false);

watch(
  myFiles,
  (newFiles) => {
    localStorage.setItem("myFiles", JSON.stringify(newFiles));
  },
  { deep: true }
);

const triggerFileSelection = (): void => {
  fileInput.value?.click();
};

const onDragOver = (event: DragEvent): void => {
  event.preventDefault();
};

const onDrop = (event: DragEvent): void => {
  event.preventDefault();
  const files = event.dataTransfer?.files;
  if (files && files.length) {
    handleFileUpload(files[0]);
  }
};

const onFileInputChange = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    handleFileUpload(input.files[0]);
  }
};

const handleFileUpload = (file: File): void => {
  const reader = new FileReader();

  reader.onload = () => {
    const csv = reader.result as string;
    parseCsv(csv, file.name);
  };

  reader.onerror = () => {
    console.error("Error reading file");
  };

  reader.readAsText(file);
};

const parseCsv = (csvContent: string, fileName: string): void => {
  const parsedRows: Record<string, unknown>[] = [];
  let rowCount = 0;

  isConverting.value = true;
  progress.value = 0;

  Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
    step: (row) => {
      parsedRows.push(row.data);
      rowCount++;
      progress.value = Math.min(
        100,
        Math.round((rowCount / csvContent.split("\n").length) * 100)
      );
    },
    complete: () => {
      if (parsedRows.length > 0) {
        const numberOfRows = parsedRows.length;
        const numberOfColumns = Object.keys(parsedRows[0]).length;
        const createdAt = new Date().toISOString();

        const fileData: CsvFile = {
          data: parsedRows,
          numberOfRows,
          numberOfColumns,
          createdAt,
          name: fileName,
        };

        myFiles.value.push(fileData);
        progress.value = 100;
      } else {
        console.error("No data found in CSV");
      }
      isConverting.value = false;
    },
    error: (error) => {
      console.error("Error parsing CSV:", error);
      isConverting.value = false;
    },
  });
};
</script>

<template>
  <div>
    <Transition name="fade" mode="out-in">
      <div
        class="dropArea"
        @dragover.prevent="onDragOver"
        @drop.prevent="onDrop"
        @click="triggerFileSelection"
        v-if="myFiles.length === 0"
      >
        <p>Arraste um arquivo CSV, XLSX até aqui</p>
        <p>Ou se preferir</p>

        <SelectFileButton @selectFileClick="triggerFileSelection" />

        <input
          ref="fileInput"
          type="file"
          accept=".csv"
          @change="onFileInputChange"
          style="display: none"
        />
      </div>

      <div class="uploadArea" v-else>
        <ul class="uploadArea__uploaded-files">
          <li
            class="uploadArea__uploaded-file"
            v-for="file in myFiles"
            :key="file.name"
          >
            <p>
              <img
                src="../../assets/img/csv-icon.svg"
                :alt="file.name"
                width="18"
                height="18"
              />
              {{ file.name }}
            </p>
            <SelectAnotherFileButton
              @selectAnotherFileClick="triggerFileSelection"
            />
          </li>
        </ul>

        <div class="uploadArea__progress-bar">
          <div
            class="uploadArea__progress-bar-fill"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
        <p>
          Envio do Arquivo: <strong>{{ progress }}%</strong>
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropArea {
  border: 1px dashed var(--medium-gray-color);
  padding: 36px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.uploadArea {
  margin: 20px 0;
}

.uploadArea__uploaded-files {
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.uploadArea__uploaded-file {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.uploadArea__uploaded-file p {
  display: flex;
  align-items: center;
  gap: 5px;
}

.uploadArea__progress-bar {
  width: 100%;
  background-color: var(--light-gray-color);
  border-radius: 16px;
  overflow: hidden;
}

.uploadArea__progress-bar-fill {
  height: 4px;
  background-color: var(--dark-blue-color);
  transition: width 5s ease;
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
