<template>
  <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="currency-table"
      first-number
      last-number
      align="right"
    ></b-pagination>

    <b-table
      id="currency-table"
      :fields="tableFields"
      :items="currencyList"
      :per-page="perPage"
      :current-page="currentPage"
      head-variant="dark"
      table-class="cp-table"
    >
      <template #cell(rank)="data">
        <div>
          {{ data.item.rank }}
        </div>
      </template>
      <template #cell(name)="data">
        <div class="d-flex align-items-center">
          <div class="-icon">
            <b-img :src="data.item.icon" />
          </div>
          <div class="ml-2">{{ data.item.name }}</div>
        </div>
      </template>
      <template #cell(symbol)="data">
        <div>{{ data.item.symbol }}</div>
      </template>
      <template #cell(price)="data">
        <div>{{ data.item.price }}</div>
      </template>
      <template #cell(change)="data">
        <div
          :class="data.item.change < 0 ? 'text-danger' : 'text-success ml-1'"
        >
          {{ data.item.change }} %
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    currencyList: {
      type: Array,
      required: true,
    },
    perPage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      tableFields: [
        { key: "rank", label: "Rank" },
        { key: "name", label: "Name" },
        { key: "symbol", label: "Symbol" },
        { key: "price", label: "Price ($)" },
        { key: "change", label: "Change (%)" },
      ],
    };
  },
  computed: {
    rows() {
      return this.currencyList.length;
    },
  },
};
</script>

<style scoped>
.cp-table {
  font-size: 14px;
}
.-icon {
  height: 20px;
  width: 20px;
  margin-bottom: 3px;
}
.-icon img {
  width: 100%;
  height: 100%;
}
</style>
