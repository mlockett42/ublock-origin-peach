<template>
  <v-card flat class="rounded-0" color="#fbf2e4" height="478">
    <v-container align-content-center d-flex fill-height fluid>
      <v-row justify="center">
        <v-col cols="auto" class="pa-0">
          <v-progress-circular
            size="96"
            width="8"
            class="mb-6"
            color="#d98150"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto" class="pa-0">
          <div
            style="
              font-family: More Sugar;
              color: #d98150;
              font-size: 28px;
              line-height: 28px;
              text-align: center;
            "
          >
            Logging in
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style>
.gradient-button {
  background: #d98150;
  background: linear-gradient(
    90deg,
    rgba(217, 129, 80, 1) 20%,
    rgba(217, 110, 80, 1) 100%
  );
}
</style>
