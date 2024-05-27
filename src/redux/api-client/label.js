import { axiosPrivate } from '../../config/axios'
export const createLabel = async data => {
  try {
    const res = await axiosPrivate.post('/label', data)
    return res.data
  } catch (e) {
    console.log(e)
  }
}

export const fetchListLabel = async boardId => {
  try {
    const res = await axiosPrivate.get(`/label/${boardId}/list-labels`)
    return res.data
  } catch (e) {
    console.log(e)
  }
}
export const AddlabelToCard = async (cardId, labelId) => {
  try {
    const res = await axiosPrivate.post('/cardlabel', null, {
      params: {
        cardId,
        labelId
      }
    })
    return res.data
  } catch (e) {
    console.log(e)
  }
}
export const RemoveLabelToCard = async (cardId, labelId) => {
  try {
    const res = await axiosPrivate.delete(`/cardlabel/${cardId}/${labelId}`)
    return res
  } catch (e) {
    console.log(e)
  }
}
