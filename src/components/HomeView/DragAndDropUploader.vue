<template>
  <Transition name="fade" mode="out-in">
    <div
      v-if="conversionStatus === 'initial'"
      class="file-drop-uploader"
      :class="{
        valid: fileTypeState === 'valid',
        invalid: fileTypeState === 'invalid',
      }"
      ref="fileDropArea"
      @dragover.prevent="handleDragOver"
      @drop.prevent="handleDrop"
      @dragleave.prevent="handleDragLeave"
      @click="triggerFileSelection"
    >
      <p>Arraste um arquivo CSV ou XLSX até aqui</p>
      <p>Ou se preferir</p>
      <SelectFileButton @selectFileClick="triggerFileSelection" />
      <input
        ref="fileInput"
        type="file"
        accept=".csv, .xlsx"
        @change="handleFileInputChange"
        style="display: none"
      />
    </div>

    <div
      v-else-if="conversionStatus === 'converting'"
      class="file-drop-uploader__progress-area"
    >
      <div class="file-drop-uploader__progress-area-file-name">
        <p class="file-drop-uploader__file-info">
          <img
            src="../../assets/img/csv-icon.svg"
            :alt="fileName"
            width="18"
            height="18"
          />
          {{ fileName }}
        </p>
        <SelectAnotherFileButton @selectAnotherFileClick="selectAnotherFIle" />
      </div>
      <div class="file-drop-uploader__progress-bar">
        <div
          class="file-drop-uploader__progress-bar-fill"
          :style="{ width: uploadProgress + '%' }"
        ></div>
      </div>
      <p>
        Envio do Arquivo: <strong>{{ uploadProgress }}%</strong>
      </p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from "vue";
import Papa from "papaparse";
import SelectFileButton from "./SelectFileButton.vue";
import SelectAnotherFileButton from "./SelectAnotherFileButton.vue";

interface CsvFile {
  data: Record<string, unknown>[];
  rowCount: number;
  columnCount: number;
  createdAt: string;
  name: string;
}

const files = ref<CsvFile[]>([]);
const uploadProgress = ref(0);
const fileInput = ref<HTMLInputElement | null>(null);
const fileDropArea = ref<HTMLDivElement | null>(null);
const conversionStatus = ref<"initial" | "converting" | "completed">("initial");
const fileTypeState = ref<"unknown" | "valid" | "invalid">("unknown");
const fileName = ref("");

const emit = defineEmits<{
  (e: "closeUploader"): void;
}>();

watch(
  files,
  (newFiles) => {
    localStorage.setItem("uploadedFiles", JSON.stringify(newFiles));
  },
  { deep: true }
);

watch(conversionStatus, (newStatus) => {
  if (newStatus === "completed") {
    console.log("era pra ter emitido");
    emit("closeUploader");
  }
});

const triggerFileSelection = (): void => {
  fileInput.value?.click();
};

const selectAnotherFIle = (): void => {
  conversionStatus.value = "initial";
  fileTypeState.value = "invalid";
};

const handleDragOver = (event: DragEvent): void => {
  const item = event.dataTransfer?.items[0];
  if (item) {
    fileTypeState.value = fileTypeStateFunc(item);
  }
};

const handleDrop = (event: DragEvent): void => {
  const files = event.dataTransfer?.files;
  if (files && files.length) {
    const file = files[0];
    const validationStatus = fileTypeStateFunc(file);
    if (validationStatus === "valid") {
      uploadFile(file);
    }
  }
};

const handleDragLeave = () => {
  resetValidation();
};

const handleFileInputChange = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    if (fileTypeStateFunc(file) === "valid") {
      uploadFile(file);
    }
  }
};

const fileTypeStateFunc = (
  item: File | DataTransferItem
): "valid" | "invalid" => {
  const validTypes = [
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const type = item instanceof DataTransferItem ? item.type : item.type;
  return validTypes.includes(type) ? "valid" : "invalid";
};

const resetValidation = (): void => {
  conversionStatus.value = "initial";
  fileTypeState.value = "unknown";
  fileName.value = "";
};

const uploadFile = (file: File): void => {
  const reader = new FileReader();

  fileName.value = file.name;

  reader.onload = () => {
    const csvContent = reader.result as string;
    parseCsv(csvContent);
  };

  reader.onerror = () => {
    console.error("Erro ao ler o arquivo.");
  };

  reader.readAsText(file);
};

const parseCsv = (csvContent: string): void => {
  const parsedRows: Record<string, unknown>[] = [];
  let rowCount = 0;

  conversionStatus.value = "converting";
  uploadProgress.value = 0;

  Papa.parse(csvContent, {
    skipEmptyLines: true,
    step: (row: any) => {
      parsedRows.push(row.data);
      rowCount++;
    },
    complete: () => {
      if (parsedRows.length) {
        const numberOfColumns = Object.keys(parsedRows[0]).length;
        const createdAt = new Date().toISOString();

        const csvFile: CsvFile = {
          data: parsedRows,
          rowCount,
          columnCount: numberOfColumns,
          createdAt,
          name: fileName.value,
        };

        simulateUploadProgress(csvFile);
      } else {
        console.error("Nenhum dado encontrado no CSV.");
        resetUpload();
      }
    },
    error: (error: Error) => {
      console.error("Erro ao parsear o CSV:", error);
      resetUpload();
    },
  });
};

const resetUpload = (): void => {
  conversionStatus.value = "initial";
  fileTypeState.value = "unknown";
  fileName.value = "";
  uploadProgress.value = 0;
};

const simulateUploadProgress = (csvFile: CsvFile): void => {
  let simulatedProgress = 0;

  const interval = setInterval(() => {
    simulatedProgress += 2;
    uploadProgress.value = Math.min(simulatedProgress, 100);

    if (simulatedProgress >= 100) {
      files.value.push(csvFile);
      conversionStatus.value = "completed";
      clearInterval(interval);
      fileTypeState.value = "unknown";
    } else if (fileTypeState.value === "invalid") {
      console.log(fileTypeState.value);
      clearInterval(interval);
      resetUpload();
    }
  }, 50);
};
</script>

<style scoped>
.file-drop-uploader {
  border: 1px dashed var(--medium-gray-color);
  padding: 36px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border-radius: 16px;
  transition: all 0.2s;
}

.file-drop-uploader.valid {
  background-color: var(--light-green-color);
  border: 1px dashed var(--medium-green-color);
}

.file-drop-uploader.invalid {
  background-color: var(--light-red-color);
  border: 1px dashed var(--medium-red-color);
}

.file-drop-uploader__progress-area {
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.file-drop-uploader__progress-area-file-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.file-drop-uploader__file-info {
  display: flex;
  align-items: center;
  gap: 5px;
}

.file-drop-uploader__progress-bar {
  width: 100%;
  background-color: var(--light-gray-color);
  border-radius: 16px;
  overflow: hidden;
}

.file-drop-uploader__progress-bar-fill {
  height: 4px;
  background-color: var(--dark-blue-color);
  transition: width 0.3s ease;
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
