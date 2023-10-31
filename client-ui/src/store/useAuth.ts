import { defineStore } from "pinia";
import { supabase } from "@/supabase"
import { ref } from 'vue';
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";


export const useAuthStore = defineStore("authStore", {
    state: () => {
        return {
            currentUser: null as any,
            accessToken: "" as string,
            refreshToken: "" as string,
            isLoggedIn: null as null | boolean,
        };
    },
    actions: {
        async signIn(email: string, password: string) {
            try {
                let { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                })
                this.isLoggedIn = true;
                this.accessToken = data.session.access_token;
                this.refreshToken = data?.session?.refresh_token;
                this.currentUser = data.user;
                localStorage.setItem("token", this.accessToken);
                if (error) throw error
            } catch (error) {
                alert(error.error_description || error.message);
            }
        },

        async signup(email: string, password: string) {
            try {
                let { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (data) {
                    this.isLoggedIn = true;
                    this.accessToken = data?.session?.access_token;
                    this.refreshToken = data?.session?.refresh_token;
                    this.currentUser = data.user;
                    localStorage.setItem("token", this.accessToken);
                }
                if (error) throw error
            } catch (error) {
                alert(error.error_description || error.message);
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
    }
})