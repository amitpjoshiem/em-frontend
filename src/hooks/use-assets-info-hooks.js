export function useAssetsInfoHooks() {
  function setInitValue({ ruleForm, memberAssets, id }) {
    if (memberAssets?.data) {
      ruleForm.member_id = id
      Object.assign(ruleForm, JSON.parse(JSON.stringify(memberAssets.data)))
      console.log('ruleForm - ', ruleForm)
    }
  }

  return {
    setInitValue,
  }
}
