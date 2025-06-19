export default {
  general_settings: "General Settings",
  language: {
    ru: "Russian",
    en: "English",
    uk: "Ukrainian"
  },
  email: "Email",
  phone: "Phone",
  notifications: "Notifications",
  lesson_cancel: "Lesson Cancellation",
  lesson_reschedule: "Lesson Reschedule",
  lesson_feedback: "Lesson Feedback",
  homework_not_done: "Homework Not Done",
  pause_notifications: "Pause All Notifications",
  enable_notifications: "Enable All Notifications",
  enable_now: "Enable Now",
  save: "Save",
  edit: "Edit",
  success: "Success",
  error: "Error",
  email_saved: "Email successfully saved!",
  phone_saved: "Phone successfully saved!",
  email_edit_error: "Failed to edit email field",
  phone_edit_error: "Failed to edit phone field",
  email_required: "Email field is required",
  email_invalid: "Invalid email format",
  phone_required: "Phone field is required",
  phone_numeric: "Phone must contain only digits",
  notifications_disabled: "All notifications disabled for {{duration}}",
  notifications_enabled: "All notifications enabled!",
  general: "General",
  password: "Password",
  logout: "Logout",
  dashboard: {
    greeting: "Hello",
    statistics: {
      title: "Statistics",
      students_count: "Number of students",
      homework_count: "Homeworks to complete",
      lessons_count: "Lessons in the last month"
    },
    homework: {
      title: "Homework"
    },
    upcoming_classes: {
      title: "Upcoming Classes"
    },
    view_all: "View All"
  },
  homework: {
    title: "Homework",
    filters: {
      not_completed: "Not Completed",
      completed: "Completed"
    },
    table: {
      direction: "Direction",
      student: "Student",
      task: "Task",
      date: "Date",
      progress: "Progress"
    },
    directions: {
      all: "All Directions",
      speed_reading: "Speed Reading",
      mental_arithmetic: "Mental Arithmetic",
      it: "IT"
    },
    students: {
      all: "All Students"
    }
  },
  add_homework: {
    tabs: {
      homework: "Homework",
      certificate: "Certificate"
    },
    dialog: {
      title: "Are you sure you want to switch to another tab?",
      description: "Your changes on the current tab will not be saved."
    }
  },
  register: {
    welcome: {
      title: "Welcome to the school platform!",
      description: "Here you will find exciting discoveries, engaging learning materials, and opportunities to grow with us.",
      second_description: "Ready for an adventure? Let's go together!"
    },
    form: {
      title: "Register",
      description: "Welcome to Gelios School",
      email: {
        label: "Email Address",
        placeholder: "Email Address"
      },
      username: {
        label: "Username",
        placeholder: "Username"
      },
      contact_number: {
        label: "Contact Number",
        placeholder: "+380123456789"
      },
      password: {
        label: "Enter Your Password",
        placeholder: "Password"
      },
      confirm_password: {
        label: "Confirm Password",
        placeholder: "Confirm Password"
      },
      submit: "Register",
      have_account: "Already have an account?",
      login_link: "Log In"
    },
    validation: {
      email: "This field is required or invalid email",
      username: "Username must be at least 3 characters",
      contact_number: "Enter a valid phone number",
      password: "Password must be at least 6 characters",
      confirm_password: "Passwords do not match",
      form_error: "Registration form validation failed"
    }
  },
  change_password: {
    form: {
      title: "Change Password",
      old_password: {
        label: "Old Password",
        placeholder: "Old Password"
      },
      new_password: {
        label: "New Password",
        placeholder: "New Password"
      },
      confirm_new_password: {
        label: "Confirm New Password",
        placeholder: "Confirm New Password"
      },
      submit: "Save"
    },
    validation: {
      password: "Password must be at least 6 characters",
      confirm_password: "Passwords do not match"
    },
    notifications: {
      success: {
        title: "Password Changed Successfully",
        text: "Your password has been updated."
      },
      error: {
        title: "Password Change Error",
        text: "Error changing password"
      },
      validation: {
        title: "Form Validation Error",
        text: "Please check the entered data"
      }
    }
  },
  login: {
    welcome: {
      title: "Welcome to the teacher's dashboard!",
      description: "Here you can easily manage the learning process: assign homework, issue certificates, and track student progress.",
      second_description: "Together, we open new horizons in education — let's move forward!"
    },
    form: {
      title: "Log In",
      description: "Welcome to",
      email: {
        label: "Email Address",
        placeholder: "Email Address"
      },
      password: {
        label: "Enter Your Password",
        placeholder: "Password"
      },
      submit: "Log In",
      forgot_password: "Forgot password?",
      recover: "Recover"
    },
    recovery: {
      title: "Password Recovery",
      description: "Enter the email",
      description_suffix: "linked to your profile",
      email: {
        label: "Email Address",
        placeholder: "Email Address"
      },
      submit: "Recover",
      back: "Back",
      success_message: "A password recovery link has been sent to your email"
    },
    reset: {
      title: "Password Reset",
      description: "Enter new password",
      password: {
        label: "New Password",
        placeholder: "New Password"
      },
      confirm_password: {
        label: "Confirm Password",
        placeholder: "Confirm Password"
      },
      submit: "Save",
      back: "Back"
    },
    validation: {
      email: "This field is required or invalid email",
      password: "Password must be at least 6 characters",
      confirm_password: "Passwords do not match",
      form_error: "Please check the entered data",
      password_reset_error: "Error resetting password"
    }
  }
};