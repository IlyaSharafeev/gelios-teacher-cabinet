<script setup lang="ts">
</script>

<template>
  <div class="layout">
    <div class="sidebar-wrapper">
      <aside class="sidebar">
        <nav>
          <div class="logo-mobile"></div>
          <ul>
            <li>
              <router-link to="/dashboard" class="sidebar-link">
                <img
                    src="@/assets/images/sidebar/dashboard.svg"
                    alt="Dashboard"
                    class="sidebar-icon"
                />
              </router-link>
            </li>
            <li>
              <router-link to="/schedule" class="sidebar-link">
                <img
                    src="@/assets/images/sidebar/calendar.svg"
                    alt="schedule"
                    class="sidebar-icon"
                />
              </router-link>
            </li>
            <li>
              <router-link to="/homework" class="sidebar-link">
                <img
                    src="@/assets/images/sidebar/homework.svg"
                    alt="homework"
                    class="sidebar-icon"
                />
              </router-link>
            </li>
            <li>
              <router-link to="/add-homework" class="sidebar-link">
                <img
                    src="@/assets/images/sidebar/add-homework.svg"
                    alt="homework"
                    class="sidebar-icon"
                />
              </router-link>
            </li>
            <li>
              <router-link to="/students" class="sidebar-link">
                <img
                    src="@/assets/images/sidebar/students.svg"
                    alt="students"
                    class="sidebar-icon"
                />
              </router-link>
            </li>
            <li>
              <router-link to="/settings" class="sidebar-link">
                <img
                    src="@/assets/images/sidebar/settings.svg"
                    alt="students"
                    class="sidebar-icon"
                />
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>

      <aside class="logo-wrapper">
        <div class="logo"></div>
      </aside>
    </div>


    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/mixins/mixins-media" as *;

.layout {
  display: flex;
  background-image: url('@/assets/backgrounds/dashboard.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.sidebar {
  background: #ffffff;
  border-radius: 27px;
  padding: 16px 21px;
  position: fixed;
  top: 60px;
  left: 60px;
  z-index: 1000;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 16px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.sidebar-icon {
  width: 24px;
  height: 24px;
}

.router-link-active {
  background-color: #007bff;
}

.router-link-active .sidebar-icon {
  filter: none;
  filter: brightness(0) invert(1);
}

.content {
  margin-left: 214px;
  margin-top: 65px;
  width: calc(100% - 270px);
}

.logo-wrapper {
  position: fixed;
  left: 60px;
  bottom: 60px;
  background-color: #FFFFFF;
  border-radius: 27px;
  padding: 21px;

  .logo {
    width: 50px;
    height: 50px;
    background-image: url('@/assets/images/logo/logo.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}

@include media-max(desktop) {
  .sidebar {
    top: auto;
    bottom: 32px;
    left: 32px;
    right: 32px;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

    nav {
      display: flex;
      align-items: center;
      position: relative;
    }
  }

  .sidebar ul {
    flex-direction: row;
    justify-content: center;
    gap: 25px;
    flex-grow: 1;
  }

  .logo-wrapper {
    display: none;
  }

  .logo-mobile {
    width: 50px;
    height: 50px;
    background-image: url('@/assets/images/logo/logo.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
  }

  .content {
    margin: 0;
    margin-bottom: 120px;
    margin-left: 0;
    width: 100%;
  }
}

</style>