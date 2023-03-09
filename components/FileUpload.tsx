import React, { useRef } from 'react'

interface FileUploadProps {
    setFile: Function;
    accept: string;
    children: string | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
}

const FileUpload: React.FC<FileUploadProps> = ({setFile, accept, children}) => {
    const ref = useRef<HTMLInputElement>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0]);
    }

  return (
    <div onClick={() => ref.current.click()}>
        <input 
            ref={ref} 
            accept={accept} 
            type="file" 
            style={{display: "none"}}
            onChange={onChange}
        />
        {children}
    </div>
  )
}

export default FileUpload