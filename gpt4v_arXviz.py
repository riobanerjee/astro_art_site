# some nice way to print long strings
import textwrap
def pretty_text(text):
    wrapped_text = textwrap.wrap(text, width=100)
    for line in wrapped_text:
        print(line)


from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4-turbo",
  messages=[
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "Can you explain this image in Telugu language?"},
        {
          "type": "image_url",
          "image_url": {
            "url": "https://conceptdraw.com/How-To-Guide/picture/Science-Education-Astronrmy-Hubble-Sequence.png"
          },
        },
      ],
    }
  ],
  max_tokens=300,
)