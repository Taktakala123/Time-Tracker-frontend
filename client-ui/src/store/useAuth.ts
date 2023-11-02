import { defineStore } from "pinia";
import { supabase } from "@/supabase"


export const useAuthStore = defineStore("authStore", {
    state: () => {
        return {
            currentUser: null as any,
            accessToken: "" as string,
            refreshToken: "" as string,
            isLoggedIn: null as null | boolean,
            errors: "" as string,
            
        };
    },
    actions: {
        async signIn(email: string, password: string) {
            try {
                let { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                })
                if (data && !error  ) {
                    this.isLoggedIn = true;
                    this.accessToken = data.session.access_token;
                    this.refreshToken = data?.session?.refresh_token;
                    this.currentUser = data.user;
                    localStorage.setItem("token", this.accessToken);
                }
                if (error) this.errors = error
            } catch (error) {
                console.log(error);
            }
        },

        async signup(email: string, password: string) {
            try {
                let { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (data && !error ) {
                    this.isLoggedIn = true;
                    this.accessToken = data?.session?.access_token;
                    this.refreshToken = data?.session?.refresh_token;
                    this.currentUser = data.user;
                    localStorage.setItem("token", this.accessToken);
                }
                if (error) this.errors = error
            } catch (error) {
                console.log(error);
            }
        },
        async logout() {
            try {
                await supabase.auth.signOut()
                localStorage.removeItem("token");
                this.currentUser = null;
                this.accessToken = "";
                this.refreshToken = "";
                this.isLoggedIn = false;
            } catch (error) {
                console.log(error)
            }
        },
        async getCurrent() {
            try {
                const localStorageToken = localStorage.getItem("token");
                const localUser = await supabase.auth.getSession();
                if (localStorageToken && !this.isLoggedIn) {
                    this.refreshToken = localUser?.data?.session?.refresh_token;
                    this.currentUser = localUser?.data?.session?.user;
                    this.isLoggedIn = true;
                    this.accessToken = localStorageToken;
                }
            } catch (error) {
                console.log(error);
            }
        },
    }
})