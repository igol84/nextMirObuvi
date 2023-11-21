export const waitSecond = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
}