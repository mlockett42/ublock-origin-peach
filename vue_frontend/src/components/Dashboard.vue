<template>
	<v-container
		id="dashboard"
		d-flex
		align-content-space-between
		fill-height
		fluid
	>
		<v-row>
			<v-col class="pa-0">
				<v-card flat height="494px" class="rounded-0" color="#e6e0da">
					<v-container fill-height d-flex align-content-start class="pa-6">
						<v-row>
							<v-col cols="9" align-self="center">
								<v-card-title v-if="isActive" class="primary--text pa-0"
									><span style="font-family:moresugar"
										>peachblock is active</span
									>
								</v-card-title>
								<v-card-title v-if="!isActive" class="secondary--text pa-0">
									<span style="font-family:moresugar"
										>peachblock is disabled</span
									>
								</v-card-title>
							</v-col>
							<v-spacer></v-spacer>
							<v-col cols="auto" align-self="center">
								<v-btn
									fab
									small
									v-on:click="toggleIsActive()"
									style="box-shadow: 0px 0px 8px 0px #cccccc"
								>
									<v-icon v-if="isActive" color="primary">mdi-pause</v-icon>
									<v-icon v-if="!isActive" color="secondary">mdi-play</v-icon>
								</v-btn>
							</v-col>
						</v-row>
						<v-row v-if="tab == 0">
							<v-col class>
								<v-card
									class="rounded-lg"
									color="primary--text"
									style="box-shadow: 0px 0px 8px 0px #cccccc"
								>
									<v-card-title class="text-h6">
										current page
									</v-card-title>
									<v-card-text
										>domain: google.com<br />trackers detected: 987<br />trackers
										blocked: 117 (15%)</v-card-text
									>
								</v-card>
							</v-col>
						</v-row>
						<v-row v-if="tab == 0">
							<v-col class>
								<v-card
									class="rounded-lg"
									color="primary--text"
									style="box-shadow: 0px 0px 8px 0px #cccccc"
								>
									<v-card-title class="text-h6">
										all-time
									</v-card-title>
									<v-card-text
										>trackers detected: 24,190<br />trackers blocked: 2,619
										(65%)</v-card-text
									>
								</v-card>
							</v-col>
						</v-row>
						<v-row v-if="tab == 1">
							<v-col class>
								<v-card
									class="rounded-lg"
									color="primary--text"
									style="box-shadow: 0px 0px 8px 0px #cccccc"
								>
									<v-card-text class="pb-0 primary--text"
										><span style="font-family: moresugar;"
											>June 6th</span
										></v-card-text
									>
									<v-card-title class="text-h6 pt-0">
										new feature available
									</v-card-title>
									<v-card-text
										>we're excited to announce that you can now change whether
										the plugin is on or off. This is great when blocking
										trackers prevents the site from working or if you'd like to
										support a website by viewing ads.</v-card-text
									>
								</v-card>
							</v-col>
						</v-row>
						<v-row v-if="tab == 3">
							<v-col class>
								<v-card
									class="rounded-lg"
									color="primary--text"
									style="box-shadow: 0px 0px 8px 0px #cccccc"
								>
									<v-card-text class="pb-0 primary--text"
										><span style="font-family: moresugar;"
											>about us</span
										></v-card-text
									>
									<v-card-title class="text-h6 pt-0">
										peach
									</v-card-title>
									<v-card-text>
										Peach is a company aiming to create a world in which
										internet users are given complete control over their own
										data.
									</v-card-text>
									<v-card-text>
										We're currently building a platform that allows users to
										earn passive income by selling their internet usage data.
										You'll be able to choose what data to sell, who you'd like
										to sell to, and at what price.
									</v-card-text>
									<v-card-actions class="pr-3 pb-3">
										<v-spacer></v-spacer>
										<v-btn depressed color="primary lighten-1 pl-5">
											<span
												style="font-family: glacial; font-size: 18px; text-transform: lowercase; margin-top: -5px;"
												>more</span
											>
											<v-icon>mdi-chevron-right</v-icon>
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-col>
						</v-row>
					</v-container>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="pa-0">
				<v-bottom-navigation v-model="tab" color="primary">
					<v-btn>
						<v-icon>mdi-home</v-icon>
					</v-btn>
					<v-btn>
						<v-icon>mdi-bell</v-icon>
					</v-btn>
					<v-btn>
						<v-icon>mdi-cog</v-icon>
					</v-btn>
					<v-btn>
						<v-icon>mdi-information</v-icon>
					</v-btn>
				</v-bottom-navigation>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	// import HomePage from './Dashboard/HomePage.vue';

	export default {
		name: 'Dashboard',
		components: {
			// HomePage,
		},
		data: () => ({
			tab: 0,
			isActive: true,
		}),
		computed: {
			color() {
				switch (this.value) {
					case 0:
						return 'blue-grey';
					case 1:
						return 'teal';
					case 2:
						return 'brown';
					default:
						return 'blue-grey';
				}
			},
		},
		methods: {
			toggleIsActive() {
				this.isActive = !this.isActive;
			},
		},
	};
</script>

<style></style>
