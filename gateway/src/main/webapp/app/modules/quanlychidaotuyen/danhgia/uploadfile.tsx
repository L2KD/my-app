import React from 'react';

export interface IUploadFile {
    ten_tap_tin?: string;
}

export class Uploadfile extends React.Component<IUploadFile> {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <form method="POST" action="http://localhost:8080/chidaotuyen/api/van-ban/uploadFile" encType="multipart/form-data" >
                File to upload: <input type="file" name="file" /><br/>
                Name: <input type="text" name="name" /><br/> <br/>
                <input type="submit" value="Upload" /> Press here to upload the file!
            </form>
        );
    }
}
export default Uploadfile;
