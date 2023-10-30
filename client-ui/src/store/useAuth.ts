import { defineStore } from "pinia";
import { supabase } from "@/supabase"

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
                this.currentUser = data.user;
                localStorage.setItem("token", this.accessToken);
                if (error) throw error
            } catch (error) {
                console.log(error)
                return { error: error };

            }
        },

        async signup(email: string, password: string) {
            try {
                const data = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (data) {
                    this.isLoggedIn = true;
                    this.accessToken = data?.session?.access_token;
                    this.currentUser = data.user;
                    localStorage.setItem("token", this.accessToken);
                }
            } catch (error) {
                console.log(error)
                return { error: error };
            }
        }
        // async getCurrent() {
        //     try {
        //       const localStorageToken = localStorage.getItem("token");
        //       if (localStorageToken && !this.isLoggedIn) {
        //         this.isLoggedIn = true;
        //         this.accessToken = localStorageToken;
        //         const res = await service.api.authControllerGetClientByToken(
        //           { token: localStorageToken },
        //           { format: "json" }
        //         );
        //         if (!res) {
        //           localStorage.removeItem("token");
        //           window.location.pathname = "/auth/sign-in";
        //         }
        //         if (res && res.hasOwnProperty("data")) {
        //           if (res.data.client !== undefined) {
        //             delete res.data.client.password;
        //             this.currentUser = res.data.client;
        //           } else {
        //             delete res.data.user.password;
        //             this.currentUser = res.data.user;
        //           }
        //           // update token
        //           this.accessToken = res.data.token;
        //           localStorage.setItem("token", res.data.token);
        //         }
        //         service.setBaseApiParams({
        //           headers: {
        //             Authorization: "Bearer " + this.accessToken,
        //           },
        //         });
        //       }
        //     } catch (error) {
        //       console.log(error);
        //     }
        // }
    }
})