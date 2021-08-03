class MembersListPagination {
  constructor({ count, current_page, links, per_page, total }) {
    this.count = count
    this.currentPage = current_page
    this.links = links
    this.perPage = per_page
    this.total = total
  }
}

export { MembersListPagination }
