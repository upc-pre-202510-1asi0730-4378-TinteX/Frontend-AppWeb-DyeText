<script>
import {AssignUserService} from "../../assignUsers/services/assign-user.service.js";
import {AssignUser} from "../../assignUsers/model/assign-user.entity.js";
import {UserCardService} from "../services/user-card.service.js";
import {PaymentCard} from "../model/user-card.entity.js";
import {useAuthenticationStore} from "../../iam/services/authentication.store.js";

export default {
  name: "subscriptions-and-payments-buys",
  props:{
    visible: false,
  },
  data(){
    return {
      users: [],
      userCards: [],
      userService: null,
      userCardService: null,
      email: '',
      cardNumber: '',
      cardDate: '',
      cardCvv: '',
      nameOnCard: '',
      country: '',
      authenticationStore: useAuthenticationStore()
    }
  },
  emits: ['cancel-requested'],
  methods: {
    onCancelRequested(){
      this.$emit('cancel-requested');
    },
    createCard(){
      let newCard = new PaymentCard({
        userName: this.nameOnCard,
        country: this.country,
        numberCard: this.cardNumber.replace(/\s+/g, '').replace(/(\d{4})(?=\d)/g, '$1 '),
        expirationDate: this.cardDate,
        cvv: this.cardCvv,
      });
      this.userCardService.create(newCard).then(m => {
        this.userCard = { key: this.authenticationStore.currentToken, subscriptionActive : true }
        localStorage.setItem('userCard', JSON.stringify(this.userCard));
      })
      alert("Subscripción exitosa")
    }
  },
  created() {
    this.userService = new AssignUserService();
    this.userCardService = new UserCardService();

    this.userService.getAll().then((response) => {
      this.users = response.data.map(elem => new AssignUser(elem));
      console.log(this.users);
    }).catch((error) => {console.log(error)});

    this.userCardService.getAll().then((response) => {
      this.userCards = response.data.map(elem => new PaymentCard(elem));
      console.log(this.userCards);
    }).catch((error) => {console.log(error)});
  }
}
</script>

<template>
  <!--
  <svg xmlns="http://www.w3.org/2000/svg" width="856.12205" height="674" viewBox="0 0 856.12205 674" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" artist="Katerina Limpitsouni" source="https://undraw.co/"><path d="M593.26357,266.136h-3.54069V169.13919A56.13918,56.13918,0,0,0,533.58377,113H328.0828a56.13913,56.13913,0,0,0-56.13933,56.13893v532.1324a56.13909,56.13909,0,0,0,56.13905,56.13917h205.501a56.13914,56.13914,0,0,0,56.13933-56.13895V335.18h3.54069Z" transform="translate(-171.93898 -113)" fill="#3f3d56"/><path d="M535.426,128.93322H508.60134A19.918,19.918,0,0,1,490.16,156.37379H372.4311a19.91806,19.91806,0,0,1-18.44139-27.44057H328.93542a41.92409,41.92409,0,0,0-41.92413,41.924V702.20874a41.92407,41.92407,0,0,0,41.92408,41.92408H535.426a41.92411,41.92411,0,0,0,41.92414-41.924V170.8573a41.92407,41.92407,0,0,0-41.92408-41.92408Zm-4.50666,246.49737a10.8911,10.8911,0,0,1-10.8592,10.8592H467.574a10.89109,10.89109,0,0,1-10.8592-10.8592v-2.7148a10.89111,10.89111,0,0,1,10.8592-10.8592h52.48612a10.89115,10.89115,0,0,1,10.8592,10.8592Zm5.88207-47.96146a10.89111,10.89111,0,0,1-10.8592,10.8592H337.7161a10.89109,10.89109,0,0,1-10.8592-10.8592v-2.7148a10.89112,10.89112,0,0,1,10.8592-10.8592H525.94221a10.89116,10.89116,0,0,1,10.8592,10.8592Zm0-47.96146a10.89111,10.89111,0,0,1-10.8592,10.8592H337.7161a10.89109,10.89109,0,0,1-10.8592-10.8592v-2.7148a10.89112,10.89112,0,0,1,10.8592-10.8592H525.94221a10.89116,10.89116,0,0,1,10.8592,10.8592Zm0-47.96146a10.8911,10.8911,0,0,1-10.8592,10.8592H337.7161a10.89109,10.89109,0,0,1-10.8592-10.8592v-2.7148a10.89111,10.89111,0,0,1,10.8592-10.8592H525.94221a10.89116,10.89116,0,0,1,10.8592,10.8592Z" transform="translate(-171.93898 -113)" fill="#fff"/><circle cx="169.84933" cy="213.56423" r="6.33453" fill="#fff"/><circle cx="190.66279" cy="213.56423" r="6.33453" fill="#fff"/><circle cx="211.47625" cy="213.56423" r="6.33453" fill="#fff"/><circle cx="232.28972" cy="213.56423" r="6.33453" fill="#fff"/><circle cx="300.15971" cy="261.52569" r="6.33453" fill="#fff"/><circle cx="320.97317" cy="261.52569" r="6.33453" fill="#fff"/><circle cx="341.78664" cy="261.52569" r="6.33453" fill="#fff"/><path d="M538.25762,456.6012H323.5908a19.01566,19.01566,0,0,0-19.01568,19.01563v104.59a19.01571,19.01571,0,0,0,19.01566,19.01571H538.25762a19.0157,19.0157,0,0,0,19.0157-19.01565V475.61688a19.01566,19.01566,0,0,0-19.0156-19.01568Zm-219.978,12.97163c.42392-.07665,10.47581-1.78725,18.79934,3.22117,8.323,5.00748,11.52088,14.6906,11.65264,15.1l.33649,1.04412-1.0801.19161a28.669,28.669,0,0,1-4.65836.34214,27.73763,27.73763,0,0,1-14.14144-3.56421c-8.323-5.00653-11.52041-14.6897-11.65221-15.09912l-.33651-1.04411Zm46.59851,97.10524H326.59051a10.52909,10.52909,0,0,1,0-21.05818h38.28762a10.52909,10.52909,0,0,1,0,21.05818Zm174.2086-1.91436A11.5201,11.5201,0,0,1,527.60041,576.25H498.88473a11.5201,11.5201,0,0,1-11.48627-11.48627V547.53425A11.52,11.52,0,0,1,498.88473,536.048h28.71568a11.52,11.52,0,0,1,11.48627,11.48627Z" transform="translate(-171.93898 -113)" fill="#6c63ff"/><path d="M508.14328,561.21324H496.5975a3.10848,3.10848,0,0,0,0,6.217h11.54578a3.10849,3.10849,0,0,0,0-6.217Z" transform="translate(-171.93898 -113)" fill="#3f3d56"/><path d="M529.45864,561.21324H517.91281a3.10848,3.10848,0,0,0,0,6.217H529.4586a3.10849,3.10849,0,0,0,0-6.217Z" transform="translate(-171.93898 -113)" fill="#3f3d56"/><path d="M508.14155,552.43841H496.59576a3.10848,3.10848,0,0,0,0,6.217h11.54579a3.10848,3.10848,0,0,0,0-6.217Z" transform="translate(-171.93898 -113)" fill="#3f3d56"/><path d="M529.45691,552.43841H517.91107a3.10848,3.10848,0,0,0,0,6.217h11.54579a3.10848,3.10848,0,0,0,0-6.217Z" transform="translate(-171.93898 -113)" fill="#3f3d56"/><path d="M508.14155,543.84123H496.59576a3.10848,3.10848,0,0,0,0,6.217h11.54579a3.10848,3.10848,0,0,0,0-6.217Z" transform="translate(-171.93898 -113)" fill="#3f3d56"/><path d="M529.45691,543.84123H517.91107a3.10848,3.10848,0,0,0,0,6.217h11.54579a3.10848,3.10848,0,0,0,0-6.217Z" transform="translate(-171.93898 -113)" fill="#3f3d56"/><rect x="487" y="383.00001" width="28" height="27.99999" fill="#e6e6e6"/><path d="M625.939,513h46v46h-46Zm44,2h-42v42h42Z" transform="translate(-171.93898 -113)" fill="#3f3d56"/><rect y="152.00001" width="28" height="28" fill="#e6e6e6"/><path d="M232.939,276h-46V230h46Zm-44-2h42V232h-42Z" transform="translate(-171.93898 -113)" fill="#3f3d56"/><polygon points="653.077 661.417 640.817 661.417 634.985 614.129 653.079 614.129 653.077 661.417" fill="#ffb8b8"/><path d="M632.06,657.91362H655.7039a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H617.17317a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,632.06,657.91362Z" fill="#2f2e41"/><polygon points="714.077 661.417 701.817 661.417 695.985 614.129 714.079 614.129 714.077 661.417" fill="#ffb8b8"/><path d="M693.06,657.91362H716.7039a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H678.17317a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,693.06,657.91362Z" fill="#2f2e41"/><path d="M763.51493,605.30342a10.74267,10.74267,0,0,1,4.51052-15.84306l41.67577-114.86668,20.5071,11.19135L782.62359,595.55579a10.80091,10.80091,0,0,1-19.10866,9.74763Z" transform="translate(-171.93898 -113)" fill="#ffb8b8"/><path d="M879.75379,626.88737a10.74271,10.74271,0,0,1-2.89305-16.21659L863.95,489.16137l23.33776,1.06622L892.65342,609.748a10.80091,10.80091,0,0,1-12.89963,17.13934Z" transform="translate(-171.93898 -113)" fill="#ffb8b8"/><circle cx="670.5842" cy="315.75634" r="24.56103" fill="#ffb8b8"/><path d="M879.59694,599.25244H805.55006l.08911-.57617c.13306-.86133,13.19678-86.439,3.56177-114.436a11.813,11.813,0,0,1,6.06934-14.58349h.00024c13.77173-6.48535,40.20752-14.47119,62.52,4.90918a28.23446,28.23446,0,0,1,9.45947,23.396Z" transform="translate(-171.93898 -113)" fill="#ccc"/><path d="M819.77174,524.88428l-33.33667-6.76319,15.62622-37.02978a13.99723,13.99723,0,0,1,27.10571,6.99756Z" transform="translate(-171.93898 -113)" fill="#ccc"/><path d="M862.46778,537.44189l-2.00415-45.9414c-1.51977-8.63623,3.42408-16.80029,11.02735-18.13477,7.60547-1.32959,15.03174,4.66016,16.55835,13.35987l7.533,42.92773Z" transform="translate(-171.93898 -113)" fill="#ccc"/><path d="M877.13341,593.75241c11.91455,45.37671,13.21436,103.06939,10,166l-16-2-29-120-16,122-18-1c-5.37744-66.02973-10.61328-122.71527-2-160Z" transform="translate(-171.93898 -113)" fill="#2f2e41"/><path d="M858.70645,447.73782c-4.582,4.88078-13.09131,2.26066-13.68835-4.40717a8.05477,8.05477,0,0,1,.01014-1.5557c.30826-2.95357,2.01461-5.635,1.60587-8.7536a4.59042,4.59042,0,0,0-.84011-2.14891c-3.65124-4.88934-12.22227,2.18687-15.6682-2.2393-2.113-2.714.3708-6.98712-1.25065-10.02051-2.14006-4.00357-8.47881-2.0286-12.45388-4.22115-4.42275-2.43949-4.15821-9.22525-1.24686-13.35269,3.55052-5.0336,9.77572-7.71952,15.92336-8.10661s12.25292,1.27475,17.99229,3.51145c6.52109,2.54134,12.98768,6.05351,17.00067,11.78752,4.88021,6.97317,5.34986,16.34794,2.90917,24.50175C867.5152,437.69294,862.44812,443.75214,858.70645,447.73782Z" transform="translate(-171.93898 -113)" fill="#2f2e41"/><path d="M1027.061,787h-381a1,1,0,0,1,0-2h381a1,1,0,0,1,0,2Z" transform="translate(-171.93898 -113)" fill="#3f3d56"/></svg>
  -->
  <div :class="['payment-methods-container', visible ? 'return-to-show' : 'return-to-hide']">
    <div class="payment-methods-container-info">
      <div>
        <i class="pi pi-arrow-circle-left" @click="onCancelRequested"></i>
      </div>
      <div>
        <h3>Subscribe to Team</h3>
        <span class="text-6xl font-bold">$50.00</span>
        <span class="text-1xl font-bold">per month</span>
      </div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="567.1704" height="517.30967" viewBox="0 0 567.1704 517.30967" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" artist="Katerina Limpitsouni" source="https://undraw.co/"><rect x="326.03543" y="307.38928" width="495" height="45" transform="translate(-385.45426 -17.88532) rotate(-16.24392)" fill="#3f3d56"/><path d="M386.40028,575.96948,316.35377,335.55639a7.0001,7.0001,0,0,1,4.76257-8.67871L784.8346,191.76928a7.00645,7.00645,0,0,1,8.67871,4.76221l62.05591,212.98877-1.92016.55957L791.59315,197.09106a5.00865,5.00865,0,0,0-6.19922-3.40186L321.67579,328.7976a5.00029,5.00029,0,0,0-3.40186,6.19922l70.04651,240.41309Z" transform="translate(-316.07106 -191.48811)" fill="#3f3d56"/><path d="M752.93324,410.51a6.51233,6.51233,0,0,1-6.24341-4.6831l-11.74854-40.32324a6.50734,6.50734,0,0,1,4.42212-8.0586l40.32349-11.74853a6.50722,6.50722,0,0,1,8.05859,4.42285L799.494,390.44262a6.50733,6.50733,0,0,1-4.42212,8.05859l-40.32349,11.74854A6.47854,6.47854,0,0,1,752.93324,410.51Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M385.31751,336.3a11.691,11.691,0,0,0-.43017-1.22,11.99972,11.99972,0,0,0-22.90967,6.67,11.37989,11.37989,0,0,0,.29,1.26,12.01924,12.01924,0,0,0,11.52978,8.64,11.74908,11.74908,0,0,0,3.3501-.48A12.01262,12.01262,0,0,0,385.31751,336.3Zm-8.73,12.95a10.01322,10.01322,0,0,1-12.3999-6.8,11.435,11.435,0,0,1-.28027-1.26,9.99681,9.99681,0,0,1,19.04-5.54,8.33837,8.33837,0,0,1,.45019,1.21A10.00446,10.00446,0,0,1,376.58753,349.25006Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M355.88508,344.87a11.00221,11.00221,0,0,1,4.20834-12.0571,11,11,0,1,0,5.81753,19.96694A11.00221,11.00221,0,0,1,355.88508,344.87Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M666.7472,394.43005a6.04249,6.04249,0,0,0-7.44971-4.2L592.90736,408.8l-7.14991,2h44.89991l7.1499-2,24.75-6.92A6.04864,6.04864,0,0,0,666.7472,394.43005Z" transform="translate(-316.07106 -191.48811)" fill="#ccc"/><path d="M619.77747,380.56005a6.04513,6.04513,0,0,0-7.45019-4.19l-99.61963,27.86a6.06838,6.06838,0,0,0-4.37012,6.57h25.79l7.15967-2,74.30029-20.78A6.05544,6.05544,0,0,0,619.77747,380.56005Z" transform="translate(-316.07106 -191.48811)" fill="#ccc"/><path d="M876.24147,408.79777H393.241a7.00787,7.00787,0,0,0-7,7v286a7.00755,7.00755,0,0,0,7,7H876.24147a7.00786,7.00786,0,0,0,7-7v-286A7.00818,7.00818,0,0,0,876.24147,408.79777Zm5,293a5.00181,5.00181,0,0,1-5,5H393.241a5.0018,5.0018,0,0,1-5-5v-286a5.00213,5.00213,0,0,1,5-5H876.24147a5.00213,5.00213,0,0,1,5,5Z" transform="translate(-316.07106 -191.48811)" fill="#3f3d56"/><path d="M440.23744,447.8a12,12,0,1,1,12-12A12.01375,12.01375,0,0,1,440.23744,447.8Zm0-22a10,10,0,1,0,10,10A10.0113,10.0113,0,0,0,440.23744,425.8Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M421.58526,435.8a11.00221,11.00221,0,0,1,7.413-10.39858,11,11,0,1,0,0,20.79717A11.00222,11.00222,0,0,1,421.58526,435.8Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M488.88112,577.57805a9.01031,9.01031,0,0,1-9-9v-27a9,9,0,0,1,18,0v27A9.01032,9.01032,0,0,1,488.88112,577.57805Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M512.88112,577.57805a9.01031,9.01031,0,0,1-9-9v-27a9,9,0,0,1,18,0v27A9.01032,9.01032,0,0,1,512.88112,577.57805Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M536.88112,577.57805a9.01031,9.01031,0,0,1-9-9v-27a9,9,0,0,1,18,0v27A9.01032,9.01032,0,0,1,536.88112,577.57805Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M573.88112,577.57805a9.01031,9.01031,0,0,1-9-9v-27a9,9,0,0,1,18,0v27A9.01032,9.01032,0,0,1,573.88112,577.57805Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M597.88112,577.57805a9.01031,9.01031,0,0,1-9-9v-27a9,9,0,0,1,18,0v27A9.01032,9.01032,0,0,1,597.88112,577.57805Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M621.88112,577.57805a9.01031,9.01031,0,0,1-9-9v-27a9,9,0,0,1,18,0v27A9.01032,9.01032,0,0,1,621.88112,577.57805Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M658.88112,577.57805a9.01031,9.01031,0,0,1-9-9v-27a9,9,0,0,1,18,0v27A9.01032,9.01032,0,0,1,658.88112,577.57805Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M682.88112,577.57805a9.01031,9.01031,0,0,1-9-9v-27a9,9,0,0,1,18,0v27A9.01032,9.01032,0,0,1,682.88112,577.57805Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M706.88112,577.57805a9.01031,9.01031,0,0,1-9-9v-27a9,9,0,0,1,18,0v27A9.01032,9.01032,0,0,1,706.88112,577.57805Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M743.88112,577.57805a9.01031,9.01031,0,0,1-9-9v-27a9,9,0,0,1,18,0v27A9.01032,9.01032,0,0,1,743.88112,577.57805Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M767.88112,577.57805a9.01031,9.01031,0,0,1-9-9v-27a9,9,0,0,1,18,0v27A9.01032,9.01032,0,0,1,767.88112,577.57805Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M791.88112,577.57805a9.01031,9.01031,0,0,1-9-9v-27a9,9,0,0,1,18,0v27A9.01032,9.01032,0,0,1,791.88112,577.57805Z" transform="translate(-316.07106 -191.48811)" fill="#6c63ff"/><path d="M549.89914,677.745H420.45883a6.04736,6.04736,0,1,1,0-12.09472H549.89914a6.04736,6.04736,0,1,1,0,12.09472Z" transform="translate(-316.07106 -191.48811)" fill="#e6e6e6"/><path d="M508.39914,651.745H461.95883a6.04736,6.04736,0,1,1,0-12.09472h46.44031a6.04736,6.04736,0,1,1,0,12.09472Z" transform="translate(-316.07106 -191.48811)" fill="#e6e6e6"/><rect x="71.81005" y="277.08994" width="493" height="2" fill="#3f3d56"/></svg>
      </div>
      <div>
        <span class="powered-by-cont">Powered by <span class="font-bold">DyeText</span></span>
      </div>
    </div>
    <div class="payment-methods-container-card">
      <form>
        <div class="TitleSeparator">
          <hr>
          <h2>Payment</h2>
          <hr>
        </div>
        <div class="w-full form-group">
          <label class=" text-gray-700  mb-2"
                 for="email">Email</label>
          <input
              class=" w-full px-4 py-2
              border border-gray-300 hover:shadow-lg
               hover:border-blue-300 bg-gray-100"
              placeholder="...@gmail.com"
              type="text"
              id="email"
              v-model="email" required
          />
        </div>
        <div class="w-full form-group">
          <label class=" text-gray-700  mb-2"
                 for="card-information">Card Information</label>
          <input
              class="card-number card-info  w-full px-4 py-2
              border border-gray-300 hover:shadow-lg
              hover:border-blue-300 bg-gray-100"
              placeholder="xxxx xxxx xxxx xxxx"
              type="text"
              id="card-information"
              v-model="cardNumber" required
          />
          <div class="unique-input">
            <input
                class="card-date card-info  w-full px-4 py-2
                border border-gray-300 hover:shadow-lg
                hover:border-blue-300 bg-gray-100"
                placeholder="mm / aa"
                type="text"
                id="card-information"
                v-model="cardDate" required
            />
            <input
                class="card-cvc card-info  w-full px-4 py-2
                border border-gray-300 hover:shadow-lg
                hover:border-blue-300 bg-gray-100"
                placeholder="xxx"
                type="text"
                id="card-information"
                v-model="cardCvv" required
            />
          </div>
          <div class="w-full form-group">
            <label class=" text-gray-700  mb-2"
                   for="email">Name on card</label>
            <input
                class=" w-full px-4 py-2
                border border-gray-300 hover:shadow-lg
                hover:border-blue-300 bg-gray-100"
                placeholder=""
                type="text"
                id="email"
                v-model="nameOnCard" required
            />
          </div>
          <div class="w-full form-group">
            <label class=" text-gray-700  mb-2"
                   for="email">Country or Region</label>
            <input
                class="  w-full px-4 py-2
                border border-gray-300 hover:shadow-lg
                hover:border-blue-300 bg-gray-100"
                type="text"
                id="email"
                v-model="country" required
            />
          </div>
          <button class="w-full" role="button" type="submit"
                  @click="createCard()">
            <span>Subscribe</span>
            <i class="pi pi-lock"></i>
          </button>
          <div class="text-sub">
            <span>
              By confirming your subscription, you allow Flexile Consulting
              Ltd to charge your card for this payment and future payments in
              accordance with their terms
            </span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

.payment-methods-container{
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0f0c29;  /* fallback for old browsers */

  transition: left 1s ease;

  display: flex;
  flex-wrap: wrap;

  .pi-arrow-circle-left{
    font-size: 30px;
    cursor: pointer;
  }
}

.payment-methods-container-info{
  color: #f9f9f9;
  padding: 20px;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  svg{
    width: 20rem;
    height: fit-content;
    margin-left: 45px;
  }
}

.payment-methods-container-card{
  padding: 20px;
  flex-basis: 50%;
  background: #f9f9f9;
  box-shadow: -10px 0 20px rgba(231, 225, 225, 0.2);  /*  shadow left */
  border-left: 1px solid rgba(206, 201, 201, 0.3);

  form{
    padding: 35px 50px;
  }
  .form-group{
    margin: 15px 0;
  }

  input{
    color: #1a1a1a;
    border-radius: 5px;
    border: #1a1a1a 1px solid;
  }

  label{
    margin-bottom: 10px;
  }

  input:focus{
    outline: none;
  }

  button{
    position: relative;
    background: #003366;

    i{
      position: absolute;
      right: 20px;
      top: 30%;
    }
  }

  .text-sub{
    font-size: 12px;
    text-align: center;
    margin-top: 22px;
    color: #1a1a1a;
  }
}

.TitleSeparator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 800px;
}

.TitleSeparator h2 {
  font-size: 30px;
  font-weight: 600;
  color: #1e1e1e;
  margin: 0;
}

.TitleSeparator hr {
  flex-grow: 1;
  height: 2px;
  background-color: #00A295;
  border: none;
}

.unique-input{
  display: flex;
}

.card-number{
  border-radius: 5px 5px 0 0!important;
}
.card-info{
  &:nth-child(1){
    border-radius: 0 0 0 5px;
  }
  &:nth-child(2){
    border-radius: 0 0 5px 0;
  }
}


</style>