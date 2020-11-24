<template>
  <div>
    <b-form-select
      v-model="selected"
      :options="options"
      @change="$emit('items-per-page-changed', selected)"
    ></b-form-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "10",
      options: [
        { value: "10", text: "10" },
        { value: "25", text: "25" },
        { value: "50", text: "50" },
        { value: "100", text: "100" },
      ],
    };
  },
};
</script>
