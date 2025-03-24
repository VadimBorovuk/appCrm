import {defineStore} from 'pinia'
import {useApiUser} from "~/api/user.js";

export const useUserStore = defineStore('user', () => {
  const {getUserInfo} = useApiUser()

  const userData = ref({
    access: {},
    department: [],
    role: '',
    user_info: {}
  })

  const departments = ref([
    {code: "call_center", icon: "ic:baseline-headset-mic", path: "callcenter/#/"},
    {code: "service_desk", icon: "ic:baseline-table-chart", path: "service-desk/#/"},
  ])
  const errorUserData = ref(null)

  const fetchUserData = async () => {

    try {
      // if (import.meta.server) return // Запобігаємо запитам під час SSR

      const account = await getUserInfo()
      if (!account?.data?.data) throw new Error('Invalid API response format')

      const {access, department, role, user_info} = account.data.data
      userData.value = {access, department, role, user_info}
      errorUserData.value = null
    } catch (error) {
      errorUserData.value = error.message
      userData.value = {
        access: {},
        department: [],
        role: '',
        user_info: {}
      }
      throw error
    } finally {
    }
  }

  return {
    departments,
    userData,
    errorUserData,
    fetchUserData
  }
})
