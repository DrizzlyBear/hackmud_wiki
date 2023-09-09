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

            current_page.content = current_page.content.gsub(/("[A-Za-z0-9]*")/i, '<span class="value">\1</span>')
      end
   end
end