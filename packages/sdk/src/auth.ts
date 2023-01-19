

import ThresholdKey from "@tkey/default";
import WebStorageModule, { WEB_STORAGE_MODULE_NAME } from "@tkey/web-storage";
import TorusServiceProvider from "@tkey/service-provider-torus";
import TorusStorageLayer from "@tkey/storage-layer-torus";
import SecurityQuestionsModule from "@tkey/security-questions";
import ShareTransferModule from "@tkey/share-transfer";
import { DirectParams } from "./types";




export const auth = {

    //AUTH FLOW (TODO: move these auth functions to seperate file)
    async triggerSSOLogin(tKey: ThresholdKey, verifierMap: Record<string, any>) {

        try {

            // 2. Set jwtParameters depending on the verifier (google / facebook / linkedin etc)
            //Not needed for google
            const jwtParams = {};

            const { typeOfLogin, clientId, verifier } = verifierMap.google;

            console.log(verifierMap, 'VERIFIER MAP')
            // 3. Trigger Login ==> opens the popup
            const loginResponse = await (
                tKey.serviceProvider as TorusServiceProvider
            ).triggerLogin({
                typeOfLogin,
                verifier,
                clientId,
                jwtParams,
            });

            console.log(loginResponse, 'LOGIN RESP?')
            // setConsoleText(loginResponse);
        } catch (error) {
            console.log(error, 'GOT IN CATCH SSO');
        }
    },

    async initializeNewKey(directParams: DirectParams, verifierMap: Record<string, any>) {
        const serviceProvider = new TorusServiceProvider({
            customAuthArgs: directParams,
        });


        // 2. Initializing tKey
        let WebStorageModule = (await import('@tkey/web-storage')).default

        const securityQuestionsModule = new SecurityQuestionsModule();
        const shareTransferModule = new ShareTransferModule();
        const storageLayer = new TorusStorageLayer({
            hostUrl: "https://metadata.tor.us",
        });

        // Creating the ThresholdKey instance
        const tKey = new ThresholdKey({
            serviceProvider: serviceProvider,
            storageLayer,
            modules: {
                webStorage: new WebStorageModule(),
                securityQuestions: securityQuestionsModule,
                shareTransfer: shareTransferModule,
            },
        });


        const init = async () => {
            // Init Service Provider
            await (tKey.serviceProvider as TorusServiceProvider).init({
                skipSw: false,
            });
            try {
            } catch (error) {
                console.error(error, 'ERROR initing tkey serviceprovider');
            }
        };
        await init()


        try {
            await this.triggerSSOLogin(tKey, verifierMap);
            //await tKey.initialize();
            //const res = await tKey._initializeNewKey({ initializeModules: true });
            //console.log("response from _initializeNewKey", res);

            //return res.privKey
        } catch (error) {
            console.error(error, "ERROR calling triggerSSOLogin");
        }
    },


};

//export default auth