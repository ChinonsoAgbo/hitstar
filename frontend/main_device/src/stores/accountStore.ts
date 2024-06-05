import {defineStore} from "pinia";
import {ref, Ref} from "vue";
import {Account} from "@shared/types";


export const useAccountStore = defineStore('user', () => {

    const account: Ref<Account | null> = ref(null);

    const loggedIn: Ref<boolean> = ref(false);



    function setAccount(username: string, token: string ){
        account.value = {username, token };
        loggedIn.value=true;
    }

    function clearAccount(){
        account.value = null;
        loggedIn.value=false;
    }



    return {
        account,
        loggedIn,
        setAccount,
        clearAccount
    };

});