export const uploadFileS3 = async (file) => {
  let urlRes = null;
  if (!file) {
    alert('Invalid file');
    return;
  }
  const formData = new FormData();
  formData.append('file', file);
  try {
    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    };
    await fetch('http://localhost:8081/api/v1/uploadFile', requestOptions)
      .then(response => response.text())
      .then(result => {
        const responseImageUrl = JSON.parse(result)?.body?.fileUrl;
        console.log(result);
        console.log(responseImageUrl);
        urlRes = responseImageUrl;
      })
      .catch(error => console.log('error', error));
  } catch (err) {
    console.log(err);
  }
  return urlRes;
};
