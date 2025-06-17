<template>
  <div class="dashboard">
    <div class="header">
      <div class="welcome-message">
        <div class="text">
          {{ $t('dashboard.greeting') }}, Оксана
        </div>
        <div class="pencil-background"></div>
      </div>
      <div class="profile">
        <div class="notification-wrapper cursor-pointer">
          <div class="notification"></div>
        </div>
        <div class="profile-image cursor-pointer"></div>
      </div>
    </div>
    <div class="main">
      <div class="content-left">
        <div class="statistic">
          <div class="statistic_title">
            {{ $t('dashboard.statistics.title') }}
          </div>
          <div class="statistic_blocks">
            <div v-for="(stat, index) in statistics" :key="index" class="statistic_block">
              <div class="statistic_block-title">{{ stat.title }}</div>
              <div class="statistic_block-description">{{ $t(`dashboard.statistics.${stat.description_key}`) }}</div>
            </div>
          </div>
        </div>
        <div class="homework">
          <div class="homework__title">{{ $t('dashboard.homework.title') }}</div>
          <div class="homework__items">
            <div v-for="(homework, index) in homeworks" :key="index" class="homework__item" :class="{ 'homework__item--overdue': homework.isOverdue }">
              <div class="name-student">{{ homework.studentName }}</div>
              <div class="name-trainer">{{ homework.trainerName }}</div>
              <div class="homework-date">{{ homework.date }}</div>
            </div>
          </div>
        </div>
        <router-link to="homework" class="button btn-watch-all">{{ $t('dashboard.view_all') }}</router-link>
      </div>
      <div class="content-right">
        <div class="upcoming-classes">
          <div class="upcoming-classes__title">{{ $t('dashboard.upcoming_classes.title') }}</div>
          <div class="upcoming-classes__items">
            <div v-for="(item, index) in upcomingClasses" :key="index" class="upcoming-classes__item">
              <div class="upcoming-classes__item-name">{{ item.name }}</div>
              <div class="upcoming-classes__item-date">{{ item.date }}</div>
              <div class="upcoming-classes__item-icon"></div>
            </div>
          </div>
        </div>
        <router-link to="schedule" class="button btn-watch-all">{{ $t('dashboard.view_all') }}</router-link>
      </div>
    </div>
  </div>
</template>