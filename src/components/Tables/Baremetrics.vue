<template>
  <div v-if="loading">
    <h3 class="text-2xl font-medium text-slate-900 dark:text-white">
      Loading feature
      <font-awesome-icon
        class="ml-2"
        icon="fa-solid fa-spinner"
        spin
      />
    </h3>
  </div>
  <div v-else>
    <h3 class="text-2xl font-medium text-slate-900 dark:text-white">
      {{ tagline }}
    </h3>
    <p class="text-slate-500 font-light dark:text-slate-400">
      {{ description }}
    </p>

    <DataTable
      :data="features"
      :fields="fields"
      class="mt-6"
    />
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import DataTable, {FieldType} from "@/components/DataDisplay/Table.vue";

//I have not added a type file, because it will use only in this file (in this project)
//also, some of those values, I do not have the real type, as it comes as null
type Edition = {
  id: string,
  name: string,
  description: string,
}

type Screenshot = {
  status: string,
  mode: string,
  timeOfCapture: string,
  filekeyRaw: string,
  filekeyStyled: string,
  filesize: number | null,
}

type Feature = {
  id: string,
  name: string,
  active: boolean,
  description: string,
  url: string | null,
  selector: string | null,
  takeScreenshot: boolean | null,
  filename: string | null,
  screenshots: {
    items: Screenshot[]
  } | null,
}

// Reactive variables
const loading = ref<boolean>(true)
const editions = ref<Edition[]>([])
const features = ref<Feature[]>([])
const tagline = ref<string>('')
const description = ref<string>('')
const allFieldsAvailable = ref<string[]>([])
const fields = ref<FieldType[]>([
  {
    key: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    key: 'description',
    label: 'Description',
    sortable: true,
  },
])

// Methods
const getBaremetrics = async () => {
  // getting the baseURL from the env
  const baseUrl = process.env.VUE_APP_BASEURL

  try {
    //I received a CORS error, so, I've used a proxy to solve it
    const res = await axios.get('https://corsproxy.io/?' + baseUrl + 'baremetrics.json')

    //setting data
    editions.value = res.data.editions.items;
    features.value = res.data.features.items;
    tagline.value = res.data.tagline;
    description.value = res.data.description;

    //getting all fields available from the first item
    allFieldsAvailable.value = Object.keys(res.data.features.items[0])

    //setting the fields to be displayed
    loading.value = false
  } catch (error) {
    //We could use a better error handling, as a toast or a modal
    console.error(error)
    loading.value = false
  }
}

// life cycle events
onMounted(async () => {
  // getting the baremetrics as soon as the component is mounted
  await getBaremetrics()
});
</script>
