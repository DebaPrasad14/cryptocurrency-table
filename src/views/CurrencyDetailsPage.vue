<template>
  <div class="container ct-container">
    <div class="mt-4">
      <h1 class="text-header">Top 100 Cryptocurrencies</h1>
      <template v-if="isLoading">
        <div class="ct-centered">
          <Loader />
        </div>
      </template>
      <template v-else-if="isError">
        <div class="ct-centered">
          <PageError />
        </div>
      </template>
      <template v-else-if="currencyList.length">
        <CurrencyTable :currencyList="currencyList" :perPage="itemsPerpage" />
      </template>
    </div>
  </div>
</template>

<script>
import CurrencyTable from "@/components/CurrencyTable";
import PageError from "@/components/PageError";
import Loader from "@/components/Loader";
import axios from "axios";

export default {
  components: {
    CurrencyTable,
    PageError,
    Loader,
  },
  data() {
    return {
      limit: 100,
      BASE_URL: "https://api.coinranking.com/v1/public/coins/",
      isLoading: false,
      isError: false,
      currencyList: [],
      itemsPerpage: "10",
      interval: null,
    };
  },
  created() {
    this.fetchCurrencyDetails();

    this.interval = setInterval(() => {
      this.fetchCurrencyDetails();
    }, 30000);
  },
  methods: {
    fetchCurrencyDetails() {
      this.isLoading = true;
      axios
        .get(`${this.BASE_URL}?limit=${this.limit}`)
        .then((response) => {
          this.currencyList = response.data.data.coins.reduce((acc, el) => {
            let obj = {
              id: el.uuid,
              rank: el.rank,
              icon: el.iconUrl,
              name: el.name,
              symbol: el.symbol,
              price: parseFloat(el.price).toFixed(2),
              change: el.change,
            };
            return acc.concat(obj);
          }, []);
        })
        .catch((e) => {
          this.isError = true;
          // eslint-disable-next-line
          console.log("Error in fetching data: ", e);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.ct-container {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "segoe ui", Roboto,
    Helvetica, Arial, sans-serif;
}
.text-header {
  display: block;
  margin-bottom: 1em;
  font-size: 30px;
  line-height: 1.6em;
  font-weight: 600;
  color: rgb(23, 24, 27);
  text-align: center;
}
.ct-centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
