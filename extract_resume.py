import PyPDF2

# Open the PDF file
with open('Akshay Pratap Singh_Resume.pdf', 'rb') as pdf_file:
    # Create a PDF reader object
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    
    # Extract text from each page
    text = ''
    for page in pdf_reader.pages:
        text += page.extract_text() + '\n'
    
    # Print the extracted text
    print(text)