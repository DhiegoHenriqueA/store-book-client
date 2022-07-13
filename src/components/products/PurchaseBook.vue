<script lang="ts" setup>
import { defineProps, onMounted } from "vue";

const props = defineProps({
  data: Object,
});

onMounted(() => {
  console.log(props.data);
});
</script>
<template>
    <div class="q-pa-md" style="justify-content: center; display: flex;">
        <div class="shadow-2 rounded-borders container row">
            <div class="q-pa-md">
                <div class="capa">
                    <q-card class="my-card">
                        <img src="https://cdn.quasar.dev/img/mountains.jpg">
                    </q-card>
                </div>
                <div class="q-pt-md">
                    <div class="text-h6">Our Changing Planet</div>
                    <div class="text-subtitle2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                    <div class="q-mt-md">
                        <span class="text-h6">33,40</span>
                        <span class="text-h6 float-right">
                            <q-btn class="float-right" color="secondary" icon-right="mail" label="Comprar" />
                        </span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    background-color: rgb(255, 255, 255);
    width: 60%;
}
</style>