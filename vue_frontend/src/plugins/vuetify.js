import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#d98150',
				secondary: '#f5b18e',
			},
			dark: {
				primary: '#d98150',
				secondary: '#f5b18e',
			},
		},
	},
});
