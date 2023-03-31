
export default async function FilePicker()
{
  let fileHandle
  [fileHandle] = await window.showOpenFilePicker(pickOptions)
  return await fileHandle.getFile()
}

const pickOptions = {
    types : [
        {
          description: 'Images',
          accept: {
            'image/*': ['.png', '.jpeg', '.jpg']
          }
        },
    ],

    excludeAcceptAllOption: true,
    multiple: false
}

