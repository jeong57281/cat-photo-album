const baseUrl = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

export const request = async (nodeId) => {
  try {
     const res = await fetch(`${baseUrl}/${nodeId ? nodeId : ''}`)
     if(!res.ok) throw new Error('서버 에러');
     return await res.json()
  } catch(err) {
    console.log(err);
  }
}
// 오류가 발생한 경우 화면에 어떻게 알리지