<template>
  <div class="absolute top-[15px]">
    <InputSearch
      :placeholder="'Search members'"
      class="w-[320px]"
      name="search"
    />
    <ul
      v-if="false"
      class="bg-white border rounded-md border-input-border w-[320px] mt-[2px]"
    >
      <li
        class="
          pl-5
          pt-2
          pb-2
          border-b border-input-border
          hover:bg-input-border
          cursor-pointer
          h-[36px]
          text-main
        "
      >
        Value 1
      </li>
      <li
        class="
          pl-5
          pt-2
          pb-2
          border-b border-input-border
          hover:bg-input-border
          cursor-pointer
          text-main
          h-[36px]
        "
      >
        Value 2
      </li>
      <li
        class="
          pl-5
          pt-2
          pb-2
          border-b border-input-border
          hover:bg-input-border
          cursor-pointer
          text-main
          h-[36px]
        "
      >
        Value 3
      </li>
      <li
        class="
          pl-5
          pt-2
          pb-2
          border-b border-input-border
          hover:bg-input-border
          cursor-pointer
          text-main
          h-[36px]
        "
      >
        Value 4
      </li>
      <li
        class="
          pl-5
          pt-2
          pb-2
          hover:bg-input-border
          cursor-pointer
          text-main
          h-[36px]
        "
      >
        Value 5
      </li>
    </ul>
  </div>
</template>
