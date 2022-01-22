<template>
  <v-card flat height="calc(100vh - 72px)" class="rounded-0" color="#f5e1d5">
    <v-container class="pa-6">
      <v-row>
        <v-col>
          <v-container class="mb-6">
            <v-row>
              <v-col cols="auto" class="pa-0" align-self="center">
                <div
                  style="
                    color: #d98150;
                    font-family: league spartan;
                    font-size: 24px;
                    line-height: 24px;
                  "
                >
                  sell my data
                </div>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="auto" class="pa-0" align-self="center">
                <v-chip-group
                  mandatory
                  v-bind:value="sellingState"
                  style="margin: 0px"
                >
                  <v-chip
                    v-on:click="$emit('off')"
                    v-bind:text-color="`${!sellingState ? 'white' : '#944b15'}`"
                    v-bind:style="{
                      backgroundColor: `${
                        !sellingState ? '#d98150' : 'rgb(245, 225, 213)'
                      }`,
                    }"
                    style="
                      align-self: right;
                      font-family: More Sugar;
                      font-weight: 400;
                      background-color: #d98150;
                      margin: 0px;
                    "
                  >
                    Off
                  </v-chip>
                  <v-chip
                    v-on:click="$emit('on')"
                    v-bind:text-color="`${sellingState ? 'white' : '#944b15'}`"
                    v-bind:style="{
                      backgroundColor: `${
                        sellingState ? '#d98150' : 'transparent'
                      }`,
                    }"
                    style="
                      align-self: right;
                      font-family: More Sugar;
                      font-weight: 400;
                      background-color: #d98150;
                      margin: 0px;
                    "
                  >
                    On
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-container>
          <v-card v-if="sellingState" flat color="transparent" height="366px">
            <v-container align-content-center d-flex fill-height fluid>
              <v-row>
                <v-col cols="12" class="pa-0">
                  <v-card-text class="pa-0">
                    <v-container class="mb-3">
                      <v-row>
                        <v-col class="pa-0">
                          <div
                            style="
                              font-family: Glacial Indifference;
                              font-size: 16px;
                              line-height: 16px;
                              color: rgba(0, 0, 0, 0.6);
                              text-align: justify;
                            "
                          >
                            <p>
                              To receive payouts, you'll need to email us at
                              <a
                                href="mailto:hello@gopeach.app"
                                target="_blank"
                                style="color: #d98150; text-decoration: none"
                                >hello@gopeach.app</a
                              >.
                            </p>
                            <p>
                              In your email, please include the
                              <span style="color: #d98150">account number</span>
                              and <span style="color: #d98150">BSB</span> of the
                              bank account you wish to receive funds into.
                            </p>
                            <p>
                              We'll then be in touch shortly, after which period
                              you will be able to earn passive income while you
                              browse online!
                            </p>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    sellingState: Boolean,
  },
};
</script>

<style>
</style>