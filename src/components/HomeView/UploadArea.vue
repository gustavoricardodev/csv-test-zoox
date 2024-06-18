
<template>
  <Transition name="fade" mode="out-in">
    <div
      class="dropArea"
      ref="dropArea"
      @dragover.prevent="onDragOver"
      @drop.prevent="onDrop"
      @click="triggerFileSelection"
      v-if="isConverting === 'none'"
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

    <div class="uploadArea" v-else-if="isConverting === 'converting'">

          <p>
            <img
              src="../../assets/img/csv-icon.svg"
              :alt="fileName"
              width="18"
              height="18"
            />
            {{ fileName }}
          </p>
          <SelectAnotherFileButton
            @selectAnotherFileClick="removeLastFileAdded"
          />


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
</template>

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
const dropArea = ref<HTMLDivElement | null>(null);
const isConverting = ref<stateConverting>("none");
const fileName = ref('')

type stateConverting = "none" | "converting" | "finally";

watch(
  myFiles,
  (newFiles) => {
    localStorage.setItem("myFiles", JSON.stringify(newFiles));
  },
  { deep: true }
);

watch(isConverting, (newState) => {
  if (newState === "finally") {
    emit('closePopLindinha')
  };
});

const emit = defineEmits<{
  (e: 'closePopLindinha'): void
}>()

const triggerFileSelection = (): void => {
  fileInput.value?.click();
};

const removeLastFileAdded = (): void => {
  if (myFiles.value.length) {
    myFiles.value.pop();
  }
};

const onDragOver = (event: DragEvent): void => {
  console.log("event", event.dataTransfer?.items[0].type);
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

  fileName.value = file.name

  reader.onload = () => {
    const csv = reader.result as string;
    parseCsv(csv, file.name);
  };

  reader.onerror = () => {
    console.error("coiso coiso coiso");
  };

  reader.readAsText(file);
};

const parseCsv = (csvContent: string, fileName: string): void => {
  const parsedRows: Record<string, unknown>[] = [];
  let rowCount = 0;

  isConverting.value = "converting";
  progress.value = 0;

  Papa.parse(csvContent, {
    skipEmptyLines: true,
    step: (row) => {
      parsedRows.push(row.data);
      rowCount++;
    },
    complete: () => {
      if (parsedRows.length) {
        const numberOfRows = parsedRows.length;
        const numberOfColumns = Object.keys(parsedRows[0]).length;
        const createdAt = new Date().toISOString();

        const fileData: CsvFile = {
          //melhorar essa data do carai
          data: parsedRows,
          numberOfRows,
          numberOfColumns,
          createdAt,
          name: fileName,
        };

        console.log(fileData);

        // aiaiani simula carregamento progressivo
        let simulatedProgress = 0;
        const interval = setInterval(() => {
          simulatedProgress += 2;
          progress.value = Math.min(simulatedProgress, 100);

          if (simulatedProgress >= 100) {
            myFiles.value.push(fileData);
            clearInterval(interval);
            isConverting.value = "finally";
          }
        }, 50);
      } else {
        // ainainain colocar mensagem de erro
        console.error("No data found in CSV");
        isConverting.value = "none";
      }
    },
    error: (error) => {
      // ainainain colocar mensagem de erro
      console.error("Error parsing CSV:", error);
      isConverting.value = "none";
    },
  });
};
</script>


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
  transition: width ease;
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
