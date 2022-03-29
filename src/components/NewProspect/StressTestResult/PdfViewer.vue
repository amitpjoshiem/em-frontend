<template>
  <div id="pdfvuer">
    <div class="flex items-center justify-center w-full">
      <div
        v-if="loading"
        style="border-top-color: transparent"
        class="w-20 h-20 border-4 border-color-link border-solid rounded-full animate-spin"
      />
    </div>

    <pdf
      v-for="i in numPages"
      :id="i"
      :key="i"
      v-model:scale="scale"
      :src="pdfdata"
      :page="i"
      style="width: 100%; margin: 20px auto"
      :annotation="true"
      @link-clicked="handle_pdf_link"
      @loading="getLoading"
    >
    </pdf>
  </div>
</template>

<script>
import pdfvuer from 'pdfvuer'

export default {
  name: 'PdfViewer',
  components: {
    pdf: pdfvuer,
  },
  props: {
    src: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      page: 1,
      numPages: 0,
      pdfdata: undefined,
      errors: [],
      scale: 'page-width',
      loading: true,
    }
  },

  mounted() {
    this.getPdf()
  },

  methods: {
    handle_pdf_link: function (params) {
      let page = document.getElementById(String(params.pageNumber))
      page.scrollIntoView()
    },

    getLoading(e) {
      console.log('eeeeee - ', e)
      if (!e) this.loading = false
    },

    getPdf() {
      let self = this
      self.pdfdata = pdfvuer.createLoadingTask(self.src)
      self.pdfdata.then((pdf) => {
        self.numPages = pdf.numPages
        window.onscroll = function () {
          changePage()
        }

        function changePage() {
          let i = 1,
            count = Number(pdf.numPages)
          do {
            if (
              window.pageYOffset >= self.findPos(document.getElementById(i)) &&
              window.pageYOffset <= self.findPos(document.getElementById(i + 1))
            ) {
              self.page = i
            }
            i++
          } while (i < count)
          if (window.pageYOffset >= self.findPos(document.getElementById(i))) {
            self.page = i
          }
        }
      })
    },

    findPos(obj) {
      return obj.offsetTop
    },
  },
}
</script>
