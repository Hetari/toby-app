<template>
  <li>
    <a
      href="#"
      class="relative flex flex-row items-center h-11 focus:outline-none border-l-4 border-transparent hover:border-indigo-500 pr-6">
      <span class="inline-flex justify-center items-center ml-4">
        <div
          class="text-[#2c2c2c] dark:text-[#f2f2f2]"
          v-html="getIcon(icon)"></div>
      </span>
      <span class="ml-2 text-sm tracking-wide truncate">{{ label }}</span>
    </a>
  </li>
</template>

<script setup lang="ts">
  defineProps({
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    featuredText: {
      type: String,
      default: '',
    },
  });

  const getIcon = (icon: string) => {
    if (icon === 'logout')
      return `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
          `;

    if (icon === 'home')
      return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"  fill="none">
      <path d="M15.0001 17C14.2006 17.6224 13.1504 18 12.0001 18C10.8499 18 9.79965 17.6224 9.00012 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <path d="M2.35151 13.2135C1.99849 10.9162 1.82198 9.76763 2.25629 8.74938C2.69059 7.73112 3.65415 7.03443 5.58126 5.64106L7.02111 4.6C9.41841 2.86667 10.6171 2 12.0001 2C13.3832 2 14.5818 2.86667 16.9791 4.6L18.419 5.64106C20.3461 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6487 13.2135L21.3477 15.1724C20.8473 18.4289 20.597 20.0572 19.4291 21.0286C18.2612 22 16.5538 22 13.1389 22H10.8613C7.44646 22 5.73903 22 4.57112 21.0286C3.40321 20.0572 3.15299 18.4289 2.65255 15.1724L2.35151 13.2135Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
  </svg>`;

    if (icon === 'link') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
    <path d="M12.1434 10.691L12.3503 10.4841C14.329 8.50532 17.5372 8.50532 19.5159 10.4841C21.4947 12.4628 21.4947 15.671 19.5159 17.6497L16.6497 20.5159C14.671 22.4947 11.4628 22.4947 9.48405 20.5159C7.50532 18.5372 7.50532 15.329 9.48405 13.3503L9.9484 12.886" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M20.0516 11.114L20.5159 10.6497C22.4947 8.67095 22.4947 5.46279 20.5159 3.48405C18.5372 1.50532 15.329 1.50532 13.3503 3.48405L10.4841 6.35031C8.50532 8.32904 8.50532 11.5372 10.4841 13.5159C12.4628 15.4947 15.671 15.4947 17.6497 13.5159L17.8566 13.309" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M4.5 4L6 6M2 8L5 9M3 13.5L5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
    }
  };
</script>
