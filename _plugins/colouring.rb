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

            #not an authoritative list, this needs to be checked for completeness
            trust_users = ["accts", "autos", "binmat", "chats", "corps", "escrow", "gui", "kernel", "market", "scripts", "sys", "trust", "users"]

            #matches asdf_1234 : "value"
            #no termination check on the above pattern because it is uncommon
            current_page.content = current_page.content.gsub(/(\w+)[ ]*:[ ]*("[\.A-Za-z0-9_]*")/i, '<span class="text_key">\1</span>:<span class="text_value">\2</span>')

            #matches asdf_1234 : 1234321
            #terminated by [whitespace, dot, ',', or }]
            current_page.content = current_page.content.gsub(/(\w+)[ ]*:[ ]*([0-9]+)([\s\.,}])/i, '<span class="text_key">\1</span>:<span class="text_value">\2</span>\3')

            trust_users.each do |name|
                #matches trust.hello_there
                #checks for whitespace prior to the pattern
                current_page.content = current_page.content.gsub(/(\s)(#{name})\.(\w+)/, '\1<span class="text_trustuser">\2</span>.<span class="text_script">\3</span>')
            end

            #matches asdf_1234.hello_there
            #checks for whitespace prior to the pattern
            current_page.content = current_page.content.gsub(/(\s)(\w+)\.(\w+)/i, '\1<span class="text_username">\2</span>.<span class="text_script">\3</span>')

            gc_suffixes = ["Q", "T", "B", "M", "K"]
            gc_styles = ["text_gcq", "text_gct", "text_gcb", "text_gcm", "text_gck"]

            gc_suffixes.zip(gc_styles).each do |suffix, style|
                #matches [0-9]T/Q/etc
                #string is terminated with GC followed by [whitespace, or dot]
                current_page.content = current_page.content.gsub(/([0-9]+)(#{suffix})([QTBMK0-9]*GC[\s\.])/,  "\\1<span class='#{style}'>\\2</span>\\3")
            end

            #matches [0-9]GC
            #string is terminated by [whitespace, or dot]
            current_page.content = current_page.content.gsub(/([0-9]+)(GC)([\s\.])/,  "\\1<span class=text_gc>\\2</span>\\3")

            # Autocolouring success and failure might be a bit much
            #current_page.content = current_page.content.gsub(/(success)/i, '<span class="text_success">\1</span>')
            #current_page.content = current_page.content.gsub(/(failure)/i, '<span class="text_failure">\1</span>')
        end
    end
end