export default {
  namespaced: true,
	state: {
    selectedTransaction: null,
    transactions: [
      {
        id: 0,
        data: "Facebook Data",
        to: "CSIRO",
        value: "$53.21",
        period: 3
      },
      {
        id: 1,
        data: "YouTube Data",
        to: "Vimeo",
        value: "$3.21",
        period: 2,
      },
      {
        id: 2,
        data: "ASOS Data",
        to: "Uniqlo",
        value: "$6.32",
        period: 1
      },
      {
        id: 3,
        data: "eBay Data",
        to: "Amazon",
        value: "$32.02",
        period: 0
      },
      {
        id: 4,
        data: "eBay Data",
        to: "Amazon",
        value: "$32.02",
        period: 0
      },
      {
        id: 5,
        data: "eBay Data",
        to: "Amazon",
        value: "$32.02",
        period: 0
      },
      {
        id: 6,
        data: "eBay Data",
        to: "Kindle",
        value: "$19.99",
        period: 0
      },
      {
        id: 7,
        data: "eBay Data",
        to: "Amazon",
        value: "$32.02",
        period: 0
      },
      {
        id: 8,
        data: "eBay Data",
        to: "Amazon",
        value: "$56.20",
        period: 0
      },
      {
        id: 9,
        data: "UWA Data",
        to: "Curtin",
        value: "$2.02",
        period: 0
      },
    ],
	},
	getters: {
    // periodTransactions: state => {
    //   return state.transactions.filter((transaction) => {return transaction.period >= state.selectedPeriod;})
    // },
    transactionDetails: state => {
      let details = [
        {key: "Time", value: "06/11/2021 8:53pm"},
        {key: "Data", value: state.selectedTransaction.data},
        {key: "Buyer", value: state.selectedTransaction.to},
        {key: "Price", value: state.selectedTransaction.value},
        {key: "Data Created", value: "04/11/2021 5:05pm"},
        {key: "Session Duration", value: "00:02:01"},
        {key: "Size", value: "2KB"},
      ];
      return details;
    }
  },
	mutations: {
    SET_SELECTED_TRANSACTION(state, value) {
      state.selectedTransaction = state.transactions.find((transaction) => {return transaction.id==value;})
    },
	},
	actions: {
    setSelectedTransaction(context, transactionId) {
      context.commit('SET_SELECTED_TRANSACTION', transactionId);
    },
	},
	modules: {},
};