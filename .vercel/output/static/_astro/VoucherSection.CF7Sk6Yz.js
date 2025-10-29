import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.BVOCwoKb.js";const v=[{code:"HAPPYDAY10",discount:10,validUntil:"2025-12-31"},{code:"WELCOME20",discount:20,validUntil:"2025-12-31"}];function C({title:m}){const[n,p]=a.useState(""),[x,i]=a.useState(""),[d,o]=a.useState(null),[g,s]=a.useState(!1),[c,l]=a.useState(""),h=`https://wa.me/6281384913190/?text=${encodeURIComponent(`Hi Ceria Hari Kita!
Saya mau tanya tentang

${m}

Nama :

Terima kasih`)}`,u=()=>{const e=n.trim();if(!e){i("Silakan masukkan kode voucher terlebih dahulu"),o(!1),s(!0);return}const r=v.find(k=>k.code===e);r?(i(`Voucher "${e}" ditemukan! Dapatkan diskon ${r.discount}%`),o(!0),l(e)):(i("Kode voucher tidak ditemukan"),o(!1),l("")),s(!0)},f=()=>{const e=n.trim();if(!e){window.open(h,"_blank");return}if(e&&e!==c&&(u(),!d))return;const r=d&&c?`https://wa.me/6281384913190/?text=${encodeURIComponent(`Hi Ceria Hari Kita!
Saya mau tanya tentang

${m}

Nama :
Kode Voucher : ${c}

Terima kasih`)}`:h;window.open(r,"_blank")};return t.jsxs("div",{className:"bg-white mt-4 p-4 rounded-md space-y-4 max-w-sm",children:[t.jsxs("div",{className:"text-sm space-y-2",children:[t.jsx("div",{children:t.jsx("label",{htmlFor:"voucher",children:"Punya kode voucher?"})}),t.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[t.jsx("input",{type:"text",id:"voucher",className:"pl-2 p-1 border rounded-md placeholder:text-gray-400",placeholder:"Masukkan kode voucher",value:n,onChange:e=>{p(e.target.value),s(!1),o(null),l("")},onKeyDown:e=>{e.key==="Enter"&&(e.preventDefault(),u())}}),t.jsx("button",{onClick:u,className:"py-1 px-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium w-fit ml-auto hover:cursor-pointer",children:"Cek Voucher"})]}),g&&t.jsxs("div",{className:`flex justify-between items-start gap-2 text-sm p-2 rounded-md w-full ${d?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`,children:[t.jsx("span",{children:x}),t.jsx("button",{className:"text-gray-600 hover:text-black text-sm font-semibold hover:cursor-pointer",onClick:()=>s(!1),children:"✕"})]})]}),t.jsx("button",{onClick:f,className:"flex items-center gap-x-1 mt-8 py-2 px-4 bg-deep-blue hover:bg-deep-blue/80 text-white rounded-full font-semibold w-fit mx-auto hover:cursor-pointer transition-colors",children:"Pesan Sekarang"})]})}export{C as default};
