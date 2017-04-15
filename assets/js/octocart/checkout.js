jQuery('#copy-address').on('change', function() {
    jQuery('input[name^="billing"]').each(function() {
        var source = jQuery(this);
        var source_name = source.attr('name');
        var target_name = source_name.replace('billing', 'shipping');
        jQuery('input[name="'+target_name+'"]').val(source.val());
    });
});