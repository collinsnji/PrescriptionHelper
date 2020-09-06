const admin = require("firebase-admin");
const serviceAccount = require("../prescription-helper-null-cat-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://prescription-helper-null-cat.firebaseio.com"
});

const firestore = admin.firestore();
class Drugs {
    async addNewDrug(drugId, drugInfo = {
        genericName: '',
        brandName: '',
        drugClass: '',
        numberOfPills: 0,
        interactions: ''
    }) {
        const document = firestore.doc(`drugs/${drugId}`);
        await document.set({
            genericName: drugInfo.genericName,
            brandName: drugInfo.brandName,
            drugClass: drugInfo.drugClass,
            numberOfPills: drugInfo.numberOfPills,
            interactions: drugInfo.interactions
        });
        console.log("Entered new drug successfully");
    }
    async getDrug(drugId) {
        const document = firestore.doc(`drugs/${drugId}`);
        const drug = await document.get();
        return drug;
    }
    async getAllDrugs() {
        const snapshot = await firestore.collection("drugs").get()
        return snapshot.docs.map(doc => doc.data());
    }

    async deleteDrug(drugID) {
        const document = firestore.doc(`drugs/${drugId}`);
        try {
            await document.delete();
            console.log(`Deleted drug ${drugID}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    async updatePrescription(drugId, numberOfPills) {
        const document = firestore.doc(`drugs/${drugId}`);
        try {
            await document.update({
                numberOfPills: numberOfPills
            });
            return true;
        } catch (error) {
            console.error(error);
            return false
        }
    }
}

module.exports = Drugs;