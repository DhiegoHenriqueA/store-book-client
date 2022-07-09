<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  data: Object,
});
</script>

<template>
  <q-card class="">
    <q-img :src="props.data.img" height="220px">
      <q-chip
        v-if="props.data.chip"
        :class="props.data.chip_class"
        :color="props.data.chip_color"
        :label="props.data.chip"
      ></q-chip>
    </q-img>

    <q-card-section>
      <q-btn
        fab
        color="teal-7"
        icon="fas fa-cart-plus"
        padding="sm"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      />
    </q-card-section>

    <q-card-section>
      <div class="text-h6">
        {{ props.data.title }}
      </div>
      <div class="text-subtitle1 text-justify q-mt-sm">
        {{ props.data.caption }}
      </div>
      <div>
        <q-rating
          v-model="props.data.rating"
          max="5"
          size="1.5em"
          color="yellow"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          readonly
          no-dimming
        />
      </div>
    </q-card-section>
    <q-card-section>
      <div class="col-12">
        <span class="text-h6">{{ props.data.amount }}</span>
        <span class="text-h6 float-right">
          <q-btn label="See Details" rounded color="secondary" outline></q-btn>
        </span>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
