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

            trust_users = ["accts", "autos", "binmat", "chats", "corps", "escrow", "gui", "kernel", "market", "scripts", "sys", "trust", "users"]

            #asdf_1234 : value
            current_page.content = current_page.content.gsub(/([A-Za-z0-9_]+)[ ]*:[ ]*("+[A-Za-z0-9_]*"+)/i, '<span class="text_key">\1</span>:<span class="text_value">\2</span>')

            trust_users.each do |name |
                #trust.hello_there
                current_page.content = current_page.content.gsub(/(#{name})\.([A-Za-z0-9_]+)/, '<span class="text_trustuser">\1</span>.<span class="text_script">\2</span>')
            end

            #asdf_1234.hello_there
            current_page.content = current_page.content.gsub(/([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)/i, '<span class="text_username">\1</span>.<span class="text_script">\2</span>')

            gc_suffixes = ["Q", "T", "B", "M", "K", "GC"]
            gc_styles = ["text_gcq", "text_gct", "text_gcb", "text_gcm", "text_gck", "text_gc"]

            gc_suffixes.zip(gc_styles).each do |suffix, style|
                #[0-9]T/Q/etc
                current_page.content = current_page.content.gsub(/([0-9]+)(#{suffix})/,  "\\1<span class='#{style}'>\\2</span>")
            end
        end
    end
end