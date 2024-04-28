package com.mo2ver.web.global.configs;

import lombok.Getter;
import org.apache.velocity.Template;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.context.Context;
import org.apache.velocity.tools.view.VelocityView;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;

import javax.servlet.ServletConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;

public class VelocityViewResolver implements ViewResolver {

    private final VelocityEngine velocityEngine;

    private final ServletConfig servletConfig;

    private boolean cache;
    @Getter
    private String prefix;
    @Getter
    private String suffix;
    @Getter
    private String contentType;

    public VelocityViewResolver(final VelocityEngine velocityEngine, final ServletConfig servletConfig) {
        this.velocityEngine = velocityEngine;
        this.servletConfig = servletConfig;
    }

    @Override
    public View resolveViewName(final String viewName, final Locale locale) throws Exception {
        final VelocityView velocityView = new VelocityView(servletConfig);
        velocityView.setVelocityEngine(this.velocityEngine);
        return new SpringVelocityView(velocityView, viewName, locale, cache, prefix, suffix, contentType);
    }

    public void setPrefix(final String prefix) {
        this.prefix = prefix;
    }

    public void setSuffix(final String suffix) {
        this.suffix = suffix;
    }

    public void setContentType(final String contentType) {
        this.contentType = contentType;
    }

    public void setCache(boolean cache) {
        this.cache = cache;
    }

    static class SpringVelocityView implements View {

        private final VelocityView velocityView;
        private final String viewName;
        private final Locale locale;

        @Getter
        private final boolean cache;
        @Getter
        private final String prefix;
        @Getter
        private final String suffix;
        private final String contentType;

        private Template template;

        public SpringVelocityView(final VelocityView velocityView,final String viewName,final Locale locale,final boolean cache, final String prefix,final String suffix,final String contentType) {
            this.velocityView = velocityView;
            this.viewName = viewName;
            this.locale = locale;
            this.cache = cache;
            this.prefix = prefix;
            this.suffix = suffix;
            this.contentType = contentType;
        }

        @Override
        public String getContentType() {
            return contentType;
        }

        @Override
        public void render(final Map<String, ?> model, final HttpServletRequest request, final HttpServletResponse response) throws Exception {
            final Context context = this.velocityView.createContext(request, response);
            context.put("locale", locale);
            for (Map.Entry<String, ?> entry : Objects.requireNonNull(model).entrySet()){
                context.put(entry.getKey(), entry.getValue());
            }
            // get the template
            if(template == null || !this.isCache()) {
                template = this.velocityView.getTemplate(this.prefix + this.viewName + this.suffix);
            }

            // merge the template and context into the response
            this.velocityView.merge(template, context, response.getWriter());
        }

    }
}
