import React from 'react';

export class Uploadfile extends React.Component {
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
