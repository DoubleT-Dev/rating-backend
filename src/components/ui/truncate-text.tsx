export default function TruncatedText({ textData } : { textData : any}) {
    const maxLength = 50;
    
    return (
        textData.substring(0, maxLength) + '...'
    );
  }