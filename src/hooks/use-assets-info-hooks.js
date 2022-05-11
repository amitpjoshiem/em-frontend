import { initialAssetsInformation } from '@/hooks/initialState/assetsInformation'

export function useAssetsInfoHooks() {
  function setInitValue({ ruleForm, memberAssets, id }) {
    if (memberAssets?.data) {
      ruleForm.member_id = id
      Object.assign(ruleForm, JSON.parse(JSON.stringify(memberAssets.data)))
    }
  }

  function setTotal(ruleForm, data) {
    ruleForm.liquid_assets.member.total = data.liquid_assets.member.total
    ruleForm.liquid_assets.spouse.total = data.liquid_assets.spouse.total
    ruleForm.liquid_assets.o_nq.total = data.liquid_assets.o_nq.total
    ruleForm.liquid_assets.balance.total = data.liquid_assets.balance.total
    ruleForm.non_liquid_assets.member.total = data.non_liquid_assets.member.total
    ruleForm.non_liquid_assets.spouse.total = data.non_liquid_assets.spouse.total
    ruleForm.non_liquid_assets.o_nq.total = data.non_liquid_assets.o_nq.total
    ruleForm.non_liquid_assets.balance.total = data.non_liquid_assets.balance.total
  }

  const resetState = (ruleForm) => {
    Object.assign(ruleForm, initialAssetsInformation)
  }

  return {
    setInitValue,
    setTotal,
    resetState,
  }
}
