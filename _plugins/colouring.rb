# frozen_string_literal: true
class WordColour < Jekyll::Generator
    def generate(site)
        all_pages = site.pages
        all_posts = site.posts.docs

        all_docs = all_pages + all_posts

        all_docs.each do |current_page|
            if current_page.data["layout"] != "page"
                next
            end

            #"hello"
            #current_page.content = current_page.content.gsub(/("[A-Za-z0-9]*")/i, '<span class="text_value">\1</span>')
            
            #asdf_1234 : value
            current_page.content = current_page.content.gsub(/([A-Za-z0-9_]*)[ ]*:[ ]*("+[A-Za-z0-9_]*"+)/i, '<span class="text_key">\1</span>:<span class="text_value">\2</span>')
            
            #asdf_1234.hello_there
            current_page.content = current_page.content.gsub(/([A-Za-z0-9_]*)\.([A-Za-z0-9_]*)/i, '<span class="text_username">\1</span>.<span class="text_script">\2</span>')
      end
   end
end