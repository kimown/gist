resizePages = (target, animate = true) -> # TODO: use target to target specific DOMs to transform - teng
  logger.log "[FRESH] Resize pages"

  smallScreen = DeviceHelper.isSmallScreen
  header = $('#header-container')
  headerSpacer = $('#header-spacer')

  # header.after headerSpacer # Important for v4 - header spacer must be moved out of header-container

  # Account for nav logo height on first page
  if navAnimation()
    hh = header.height() - 0
    headerSpacer.show().css('height', hh)
    logoHeight = $('#header-container .logo').height()
    $('a.section-anchor').css('top',-hh+logoHeight+20)
    $('a.section-anchor').first().css('top',-hh)
    ###
    if spacer.length == 0
      spacer = $('<div class="spacer"></div>').prependTo( $('li.slide .container').first() )
    hh = header.height() - 20
    ###
  else
    headerSpacer.hide()

  # BG editor on first slide
  # fixBgEditor()

  height = $(window).height()
  # if smallScreen
  #  height = if h < 640 then 640 else h

  # Resize first section to fill the height of the screen
  logger.log "[FRESH]: Resizing sections"
  $('.s-title-section, li.slide:first-child .s-cta-section, li.slide:first-child .s-slider-section').each (i, el) ->
    t = $(this); c = t.find('.container').first()
    if t.hasClass 'no-resize' # This might appear here from containBackgroundImages
      this.style.paddingTop = ''
      this.style.paddingBottom = ''
    else
# Reset inline padding in order to calculate original padding from stylesheet
      inlinePaddingTop = this.style.paddingTop
      inlinePaddingBottom = this.style.paddingBottom
      this.style.paddingTop = ''
      this.style.paddingBottom = ''
      # Ignore if the original (aka natural) padding is >100
      origPaddingTop = Math.min(100, parseInt(t.css('padding-top'), 10))
      origPaddingBottom = Math.min(100, parseInt(t.css('padding-bottom'), 10))
      this.style.paddingTop = inlinePaddingTop
      this.style.paddingBottom = inlinePaddingBottom

      # Fix slogan slide for first slide
      sectionHeight = height
      if i == 0 && t.closest('li.slide').is(':first-child')
        if smallScreen() then sectionHeight -= header.outerHeight()
        else if header.is(':visible') then sectionHeight -= header.height()
      else
        if header.is(':visible') then sectionHeight -= (header.height() - getLogoHeight())

      # HACKY: defer it because somehow DOM is not ready
      window.setTimeout ->
        return if t.hasClass 'no-resize' # This might appear here from containBackgroundImages in the delay time


        if $(el).is('.s-slider-section')
          current = $(el).find('.iosslider').data('current')
          currentSlideHeight = $(el).find('.iosslider').find('.inner').get(current).outerHeight()
          if　currentSlideHeight < sectionHeight
            $(el).find('.iosslider').height(sectionHeight).css('min-height', sectionHeight+"px")
          return

        currentHeight = t.outerHeight()
        # Disable adjustment if on mobile and resize is small
        return if Math.abs(currentHeight - sectionHeight) < 64 && DeviceHelper.isSmallScreen()
        # Adjust section height
        pad = (sectionHeight-c.outerHeight(false)) * 0.5
        ptop = Math.max (Math.min 450, Math.floor(pad)), origPaddingTop
        pbottom = Math.max (Math.min 450, Math.ceil(pad)), origPaddingBottom
        newStyles =
          'padding-top': ptop
          'padding-bottom': pbottom
        if animate # e.g. on load, on resize
          t.stop().animate newStyles, 100
        else # e.g. on switch page before fade
          t.css newStyles