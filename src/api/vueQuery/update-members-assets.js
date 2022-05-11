import { fetcher } from '@/api/fetcher/fetcher'

function updateMembersAssets({ data, id }) {
  console.log('id - ', id)
  return fetcher({
    url: `/assets_income/data/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { updateMembersAssets }
// import { fetcher } from '@/api/fetcher/fetcher'

// function updateMembersAssets(data) {
//   return fetcher({
//     url: `/assets_income`,
//     data,
//     options: { method: 'PATCH' },
//   })
// }

// export { updateMembersAssets }
