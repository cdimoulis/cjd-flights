class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  respond_to :json, :html

  ###
  # DON'T WANT TO USE THESE
  ###
  def new
    render :json => {  }, :status => 405
  end

  def edit
    render :json => {  }, :status => 405
  end

  ###
  # USEFUL CRUD OPS
  ###
  def create
    resource_params = "#{params[:controller].singularize}_params"
    resource = params[:controller].singularize.classify.constantize
    record = resource.new(required_params)
    if record.valid? and record.save
      respond_with(record)
    else
      puts "\n\nCould not create #{resource} record.\n#{record.errors.inspect}\n\n"
      Rails.logger.debug "\n\nCould not create #{resource} record.\n#{record.errors.inspect}\n\n"
      render :json => {errors: record.errors}, :status => 422
    end
  end

  def index
    resource = params[:controller].singularize.classify.constantize
    records = resource.all

    respond_with(records)
  end

  def show
    resource = params[:controller].singularize.classify.constantize
    record = resource.where("id = ?",params[:id])

    respond_with(record)
  end
end
