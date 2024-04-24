<!-- <template>
    <v-layout>
      <v-app-bar color="success" prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>Natural Farm</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'left' : undefined"
        temporary
        :clipped="true"
      >
        <v-list>
          <v-list-item v-for="item in items" :key="item.value" :to="item.route">
            <v-list-item>
              <v-list-item-title>
                <v-icon>{{ item.icon }}</v-icon
                >{{ item.title }}</v-list-item-title
              >
            </v-list-item>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: calc(100vh - 64px); overflow-y: auto;">
          <v-container fluid>
            <router-view></router-view>
          </v-container>
      </v-main>
    </v-layout>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: "Home",
        value: "foo",
        icon: "mdi-folder",
        route: "/",
      },
      {
        title: "Input Order",
        value: "bar",
        icon: "mdi-file-document",
        route: "/input-order",
      },
    ],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script> -->
<template>
  <v-layout>
    <v-app-bar color="success" prominent>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Natural Farm</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'left' : undefined"
      temporary
    >
      <v-list>
        <v-list-item v-for="item in items" :key="item.value" :to="item.route">
          <v-list-item>
            <v-list-item-title>
              <v-icon>{{ item.icon }}</v-icon
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid >
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-home', route: '/' },
        { title: 'Input Order', icon: 'mdi-information', route: '/input-order' },
      ]
    }
  }
}
</script>
